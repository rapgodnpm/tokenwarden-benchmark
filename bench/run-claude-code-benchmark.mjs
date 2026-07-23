#!/usr/bin/env node
import { access, mkdir, readFile, rm, writeFile } from "node:fs/promises"
import { join, relative, resolve } from "node:path"
import { parseArgs, csv, intArg } from "./lib/args.mjs"
import { loadAdapters } from "./lib/adapters.mjs"
import { createClaudeCodeEnv, createClaudeCodeSettings, createTokenWardenMcpConfig, claudeCodeVersion, formatLmStudioPreflightFailure, installTokenWardenClaude, lmStudioModelIDs, runClaudeCodeTask, tokenWardenClaudeReport } from "./lib/claude-code.mjs"
import { installClaudeCodeAdapter } from "./lib/claude-code-install.mjs"
import { DEFAULT_AI_TIMEOUT_MS, DEFAULT_BENCHMARK_RUNS, DEFAULT_CLONE_TIMEOUT_MS, DEFAULT_INSTALL_TIMEOUT_MS, DEFAULT_SETUP_TIMEOUT_MS, DEFAULT_UTILITY_TIMEOUT_MS, DEFAULT_VERIFY_TIMEOUT_MS } from "./lib/config.mjs"
import { changedFiles, cloneRepo, currentCommit, runSetupCommands } from "./lib/git.mjs"
import { selectBenchmarkModel } from "./lib/models.mjs"
import { DEFAULT_BENCHMARK_SUITE } from "./lib/runner-options.mjs"
import { assertDockerRuntime } from "./lib/runtime.mjs"
import { loadSuite, renderPrompt, selectTasks } from "./lib/tasks.mjs"
import { runVerifyCommands } from "./lib/verify.mjs"
import { hasMeasuredUsage } from "./lib/usage.mjs"
import { createRunWorkspace, readPreparedState, repoRoot, resolveResultsRoot, timestampID, workspaceEnv, writeJson, writePreparedState } from "./lib/workspace.mjs"

const PLATFORM = "claude-code"
assertDockerRuntime()
const args = parseArgs(process.argv.slice(2))
const root = repoRoot()
const suiteID = String(args.suite ?? DEFAULT_BENCHMARK_SUITE)
const plugins = csv(args.plugins, ["baseline", "tokenwarden", "context-mode", "rtk", "caveman"])
const taskIDs = csv(args.tasks, [])
const runs = intArg(args.runs, DEFAULT_BENCHMARK_RUNS)
const aiTimeoutMs = intArg(args.aiTimeoutMs, DEFAULT_AI_TIMEOUT_MS)
const cloneTimeoutMs = intArg(args.cloneTimeoutMs, DEFAULT_CLONE_TIMEOUT_MS)
const installTimeoutMs = intArg(args.installTimeoutMs, DEFAULT_INSTALL_TIMEOUT_MS)
const setupTimeoutMs = intArg(args.setupTimeoutMs, DEFAULT_SETUP_TIMEOUT_MS)
const verifyTimeoutMs = intArg(args.verifyTimeoutMs, DEFAULT_VERIFY_TIMEOUT_MS)
const utilityTimeoutMs = intArg(args.utilityTimeoutMs, DEFAULT_UTILITY_TIMEOUT_MS)
const dryRun = Boolean(args.dryRun)
const prepareOnly = Boolean(args.prepareOnly)
const reusePrepared = Boolean(args.reusePrepared)
const runID = String(args.runId ?? timestampID())
const resultsRoot = resolveResultsRoot(root, args.results, join(PLATFORM, runID))
const workspaceRoot = resolve(String(args.workspace ?? join("/tmp", "tokenwarden-bench", PLATFORM, runID)))
const lmStudioBaseURL = String(args.lmstudioBaseUrl ?? process.env.LMSTUDIO_BASE_URL ?? "http://localhost:1234")

const suite = await loadSuite(suiteID)
const tasks = selectTasks(suite, taskIDs)
const adapters = await loadAdapters(plugins, PLATFORM)
const caseCount = runs * tasks.length * adapters.length
const interactive = !dryRun && !prepareOnly && process.stdin.isTTY && process.stdout.isTTY
const model = await selectBenchmarkModel({ requestedModel: args.model, interactive, platform: PLATFORM })

log(`mode=${prepareOnly ? "prepare" : dryRun ? "dry" : "run"} run=${runID} model=${model}`)
log(`results=${resultsRoot}`)
log(`workspace=${workspaceRoot}`)
log(`plugins=${adapters.map((adapter) => adapter.id).join(",")} tasks=${tasks.map((task) => task.id).join(",")} runs=${runs} ai_timeout_ms=${aiTimeoutMs} verify_timeout_ms=${verifyTimeoutMs}`)
if (prepareOnly) log(`preparing ${caseCount} workspaces; "prepare: ... ok" means setup completed and is not an AI request`)
else if (!dryRun) log(`running ${caseCount} AI requests through LM Studio`)

await rm(resultsRoot, { recursive: true, force: true })
await mkdir(resultsRoot, { recursive: true })

if (!dryRun && !prepareOnly) {
  const availableModels = await lmStudioModelIDs(lmStudioBaseURL, utilityTimeoutMs)
  if (!availableModels.includes(model)) throw new Error(formatLmStudioPreflightFailure(model, lmStudioBaseURL))
}

const summaries = []

for (let run = 1; run <= runs; run += 1) {
  for (const task of tasks) {
    for (const adapter of adapters) {
      log(`start adapter=${adapter.id} task=${task.id} run=${run}`)
      const workspace = await createRunWorkspace(workspaceRoot, { plugin: adapter.id, task: task.id, run, reuse: reusePrepared })
      const baseEnv = workspaceEnv(workspace)
      const env = createClaudeCodeEnv(workspace, baseEnv, { baseURL: lmStudioBaseURL })
      const resultDir = join(resultsRoot, adapter.id, task.id, String(run))
      await mkdir(resultDir, { recursive: true })
      if (!reusePrepared) await writeJson(workspace.claudeSettingsPath, createClaudeCodeSettings())

      const taskRepo = String(args.repo ?? task.repo ?? suite.repo)
      const prompt = renderPrompt(task, { repo: taskRepo })
      const runStartedAt = Date.now()
      let failureStage = ""
      let failureMessage = ""
      let install = { actions: [], pluginDirs: [], version: undefined }
      let cloneResult
      let actualCommit
      let setupResults = []
      let claudeVersionResult
      let tokenwardenInstall
      let claudeResult = emptyClaudeResult()
      let verifyResult = { passed: true, results: [], skipped: true, reason: dryRun || prepareOnly ? "model execution skipped" : "not run" }
      let filesChanged = []
      let artifacts = []
      let tokenwarden = { skipped: true, reason: "adapter does not use TokenWarden", stdout: "", stderr: "" }

      try {
        failureStage = "install"
        install = await installClaudeCodeAdapter(adapter, workspace, {
          dryRun: reusePrepared || (dryRun && !prepareOnly),
          reusePrepared,
          env,
          repoRoot: root,
          timeoutMs: installTimeoutMs,
          utilityTimeoutMs
        })
        if (reusePrepared) {
          const prepared = await readPreparedState(workspace)
          cloneResult = prepared.clone
          setupResults = prepared.setup
          actualCommit = await currentCommit(workspace.repo, env)
          await validatePreparedClaudeAdapter(adapter, workspace)
        }

        if ((!dryRun || prepareOnly) && !reusePrepared) {
          failureStage = "clone"
          log(`clone adapter=${adapter.id} task=${task.id} run=${run} timeout_ms=${cloneTimeoutMs}`)
          cloneResult = await cloneRepo(taskRepo, workspace.repo, { branch: task.defaultBranch, commit: task.commit, env, timeoutMs: cloneTimeoutMs })
          if (cloneResult.code !== 0) throw new Error(commandFailureMessage("git clone failed", cloneResult))
          actualCommit = await currentCommit(workspace.repo, env)

          if (adapter.id === "tokenwarden") {
            failureStage = "tokenwarden-install"
            tokenwardenInstall = await installTokenWardenClaude(install.pluginDirs[0], workspace.repo, env, installTimeoutMs)
            if (tokenwardenInstall.code !== 0) throw new Error(commandFailureMessage("TokenWarden Claude Code install failed", tokenwardenInstall))
            await writeJson(workspace.claudeMcpPath, createTokenWardenMcpConfig(install.pluginDirs[0]))
          }

          failureStage = "setup"
          log(`setup adapter=${adapter.id} task=${task.id} run=${run} timeout_ms=${setupTimeoutMs}`)
          setupResults = await runSetupCommands(task.setup, workspace.repo, env, { fixturesDir: join(root, "bench", "fixtures") }, { timeoutMs: setupTimeoutMs })
          if (setupResults.some((result) => result.code !== 0)) throw new Error(commandFailureMessage(`setup failed for ${task.id}`, setupResults.find((result) => result.code !== 0)))
          failureStage = "adapter-validation"
          await validatePreparedClaudeAdapter(adapter, workspace)
          await writePreparedState(workspace, { clone: cloneResult, setup: setupResults, commit: actualCommit })
        }

        if (!dryRun && !prepareOnly) {
          failureStage = "claude-version"
          claudeVersionResult = await claudeCodeVersion(env, utilityTimeoutMs)
          if (claudeVersionResult.code !== 0) throw new Error(commandFailureMessage("claude --version failed", claudeVersionResult))

          failureStage = "claude-code-run"
          log(`ai request adapter=${adapter.id} task=${task.id} run=${run} timeout_ms=${aiTimeoutMs}`)
          claudeResult = await runClaudeCodeTask({
            env,
            model,
            prompt,
            repoPath: workspace.repo,
            settingsPath: workspace.claudeSettingsPath,
            pluginDirs: adapter.id === "tokenwarden" ? [] : install.pluginDirs,
            mcpConfigPath: adapter.id === "tokenwarden" ? workspace.claudeMcpPath : undefined,
            allowMcp: ["tokenwarden", "context-mode"].includes(adapter.id),
            timeoutMs: aiTimeoutMs
          })
          if (claudeResult.usage.isError) throw new Error("Claude Code returned an error result")
          if (claudeResult.usage.pluginErrors.length) throw new Error(`Claude Code plugin load failed: ${JSON.stringify(claudeResult.usage.pluginErrors)}`)
          if (!hasMeasuredUsage(claudeResult.usage)) {
            failureStage = "usage"
            throw new Error("Claude Code completed without recording token usage")
          }
          validateClaudeIntegration(adapter, claudeResult.usage)

          failureStage = "verify"
          log(`verify adapter=${adapter.id} task=${task.id} run=${run} timeout_ms=${verifyTimeoutMs}`)
          verifyResult = await runVerifyCommands(task.verify, workspace.repo, env, { timeoutMs: verifyTimeoutMs })
          filesChanged = await changedFiles(workspace.repo, env)
          artifacts = await collectArtifacts(task.artifacts, workspace.repo)

          if (adapter.id === "tokenwarden") {
            failureStage = "tokenwarden-report"
            tokenwarden = await tokenWardenClaudeReport(install.pluginDirs[0], claudeResult.usage.sessionIDs[0], workspace.repo, env, utilityTimeoutMs)
          }
        }
        failureStage = ""
      } catch (error) {
        if (error?.result && failureStage === "claude-code-run") claudeResult = error.result
        failureMessage = error?.stack ?? error?.message ?? String(error)
      }

      const claudeSettings = await readFile(workspace.claudeSettingsPath, "utf8").catch(() => `${JSON.stringify(createClaudeCodeSettings(), null, 2)}\n`)
      await writeFile(join(resultDir, "claude.settings.json"), claudeSettings, "utf8")
      await writeFile(join(resultDir, "prompt.md"), `${prompt}\n`, "utf8")
      await writeFile(join(resultDir, "stdout.jsonl"), claudeResult.stdout ?? "", "utf8")
      await writeFile(join(resultDir, "stderr.log"), claudeResult.stderr ?? "", "utf8")
      await writeFile(join(resultDir, "answer.md"), `${claudeResult.usage?.answer ?? ""}\n`, "utf8")
      await writeFile(join(resultDir, "verify.log"), formatVerifyLog(verifyResult), "utf8")
      await writeFile(join(resultDir, "tokenwarden-report.txt"), tokenwarden.stdout ?? "", "utf8")

      const summary = {
        platform: PLATFORM,
        runID,
        suite: suite.id,
        repo: taskRepo,
        requestedCommit: task.commit,
        commit: actualCommit,
        plugin: adapter.id,
        pluginLabel: adapter.label,
        pluginMechanism: adapter.mechanism,
        pluginVersion: install.version,
        task: task.id,
        run,
        dryRun,
        prepareOnly,
        reusePrepared,
        model,
        lmStudioBaseURL,
        resultDir,
        promptPath: join(resultDir, "prompt.md"),
        workspace: workspace.root,
        durationMs: Date.now() - runStartedAt,
        failed: Boolean(failureMessage) || (!dryRun && !prepareOnly && !verifyResult.passed),
        failureStage,
        failureMessage,
        aiTimeoutMs,
        cloneTimeoutMs,
        installTimeoutMs,
        setupTimeoutMs,
        verifyTimeoutMs,
        utilityTimeoutMs,
        pluginsEnabled: install.pluginDirs,
        installActions: install.actions,
        tokenwardenInstall: summarizeCommand(tokenwardenInstall),
        clone: summarizeCommand(cloneResult),
        setup: setupResults.map(summarizeCommand),
        claudeCodeVersion: summarizeCommand(claudeVersionResult),
        claudeCode: summarizeCommand(claudeResult),
        verification: { passed: verifyResult.passed, commands: verifyResult.results?.map(summarizeCommand) ?? [] },
        tokenwardenReport: summarizeCommand(tokenwarden),
        changedFiles: filesChanged,
        artifacts,
        usage: claudeResult.usage ?? zeroUsage()
      }
      summary.timedOut = commandTimedOut(summary)
      summaries.push(summary)
      await writeFile(join(resultDir, "summary.json"), `${JSON.stringify(summary, null, 2)}\n`, "utf8")
      const mode = prepareOnly ? "prepare" : dryRun ? "dry" : "run"
      process.stdout.write(`${mode}: ${adapter.id} ${task.id} #${run} ${summary.failed ? `failed stage=${failureStage}` : "ok"}\n`)
      if (summary.failed && failureMessage) process.stderr.write(`${failureMessage}\n`)
    }
  }
}

await writeFile(join(resultsRoot, "summary.json"), `${JSON.stringify(summaries, null, 2)}\n`, "utf8")
await writeFile(join(root, "bench", "results", "latest-claude-code.json"), `${JSON.stringify({ platform: PLATFORM, runID, resultsRoot: relative(root, resultsRoot) }, null, 2)}\n`, "utf8")
process.stdout.write(`results: ${resultsRoot}\n`)
if (summaries.some((summary) => summary.failed)) process.exitCode = 1

function summarizeCommand(result) {
  if (!result) return undefined
  if (result.skipped) return result
  return {
    command: result.command,
    args: result.args,
    code: result.code,
    signal: result.signal,
    timedOut: Boolean(result.timedOut),
    durationMs: result.durationMs,
    stdoutBytes: Buffer.byteLength(result.stdout ?? ""),
    stderrBytes: Buffer.byteLength(result.stderr ?? "")
  }
}

function commandFailureMessage(message, result) {
  if (!result) return message
  const status = result.timedOut ? `timed out after ${result.durationMs}ms` : result.signal ? `signal=${result.signal}` : `exit=${result.code}`
  const output = result.stderr || result.stdout
  return `${message} (${status})${output ? `\n${output}` : ""}`
}

function validateClaudeIntegration(adapter, usage) {
  if (usage.permissionDenials.length) throw new Error(`Claude Code denied tool permissions: ${JSON.stringify(usage.permissionDenials)}`)
  if (adapter.id === "tokenwarden") {
    const connected = usage.mcpServers.some((server) => server.name === "tokenwarden" && server.status === "connected")
    if (!connected || !usage.tools.some((tool) => tool.startsWith("mcp__tokenwarden__"))) {
      throw new Error("TokenWarden MCP server or tools were not available")
    }
  }
  if (adapter.id === "context-mode") {
    const connected = usage.mcpServers.some((server) => server.name.includes("context-mode") && server.status === "connected")
    if (!connected || !usage.tools.some((tool) => tool.includes("context-mode"))) {
      throw new Error("Context Mode MCP server or tools were not available")
    }
  }
  if (["context-mode", "caveman"].includes(adapter.id) && !usage.loadedPlugins.includes(adapter.id)) {
    throw new Error(`${adapter.label} plugin was not loaded`)
  }
}

async function validatePreparedClaudeAdapter(adapter, workspace) {
  if (!["tokenwarden", "rtk"].includes(adapter.id)) return
  const settings = JSON.parse(await readFile(workspace.claudeSettingsPath, "utf8"))
  const hooks = JSON.stringify(settings.hooks ?? {})
  if (!Object.keys(settings.hooks ?? {}).length || !hooks.toLowerCase().includes(adapter.id)) {
    throw new Error(`${adapter.label} hooks were not preserved in the prepared workspace`)
  }
  if (adapter.id === "tokenwarden") await access(workspace.claudeMcpPath)
}

async function collectArtifacts(paths, cwd) {
  const artifacts = []
  for (const relativePath of paths ?? []) {
    const path = join(cwd, relativePath)
    try {
      await access(path)
      artifacts.push({ path: relativePath, content: await readFile(path, "utf8") })
    } catch (error) {
      artifacts.push({ path: relativePath, missing: true, error: error?.code ?? error?.message ?? String(error) })
    }
  }
  return artifacts
}

function commandTimedOut(summary) {
  return [summary.clone, ...(summary.setup ?? []), summary.claudeCode, ...(summary.verification?.commands ?? []), summary.tokenwardenReport]
    .some((command) => Boolean(command?.timedOut))
}

function formatVerifyLog(verifyResult) {
  if (verifyResult.skipped) return `skipped: ${verifyResult.reason}\n`
  return verifyResult.results.map((result) => [`$ ${result.command}`, result.stdout, result.stderr, result.timedOut ? `timeout after ${result.durationMs}ms` : undefined, `exit=${result.code}`, result.signal ? `signal=${result.signal}` : undefined].filter(Boolean).join("\n")).join("\n\n")
}

function emptyClaudeResult() {
  return { stdout: "", stderr: "", usage: zeroUsage() }
}

function zeroUsage() {
  return { inputTokens: 0, outputTokens: 0, cacheReadTokens: 0, cacheWriteTokens: 0, totalTokens: 0, estimatedCostUsd: 0, sessionIDs: [], answer: "", rawEventCount: 0, resultEventFound: false, isError: false, loadedPlugins: [], pluginErrors: [], permissionDenials: [], mcpServers: [], tools: [] }
}

function log(message) {
  process.stdout.write(`[bench:${PLATFORM}] ${message}\n`)
}
