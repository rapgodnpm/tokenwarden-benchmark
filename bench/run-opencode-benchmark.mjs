#!/usr/bin/env node
import { access, mkdir, readFile, rm, writeFile } from "node:fs/promises"
import { join, relative, resolve } from "node:path"
import { parseArgs, csv, intArg } from "./lib/args.mjs"
import { loadAdapters } from "./lib/adapters.mjs"
import { DEFAULT_AI_TIMEOUT_MS, DEFAULT_BENCHMARK_RUNS, DEFAULT_CLONE_TIMEOUT_MS, DEFAULT_INSTALL_TIMEOUT_MS, DEFAULT_SETUP_TIMEOUT_MS, DEFAULT_UTILITY_TIMEOUT_MS, DEFAULT_VERIFY_TIMEOUT_MS, configuredProviderModelIDs, loadLocalProviderConfig, providerPackages, writeOpenCodeConfig } from "./lib/config.mjs"
import { changedFiles, cloneRepo, currentCommit, runSetupCommands } from "./lib/git.mjs"
import { installAdapterDependencies, installProviderDependencies } from "./lib/install.mjs"
import { BENCHMARK_MODELS, benchmarkModelAliases, selectBenchmarkModel } from "./lib/models.mjs"
import { exportSession, formatModelPreflightFailure, formatOpenRouterAuthFailure, hasOpencodeModel, hasOpenRouterAuth, opencodeAuthList, opencodeModelIDs, opencodeModels, opencodeStats, opencodeVersion, providerIDFromModel, runOpencodeTask, tokenWardenReport } from "./lib/opencode.mjs"
import { DEFAULT_BENCHMARK_SUITE } from "./lib/runner-options.mjs"
import { assertDockerRuntime } from "./lib/runtime.mjs"
import { loadSuite, renderPrompt, selectTasks } from "./lib/tasks.mjs"
import { runVerifyCommands } from "./lib/verify.mjs"
import { createRunWorkspace, inheritOpencodeAuth, readPreparedState, repoRoot, resolveResultsRoot, timestampID, workspaceEnv, writePreparedState } from "./lib/workspace.mjs"

assertDockerRuntime()

const args = parseArgs(process.argv.slice(2))
if (args._[0] === "report") {
  await import("./report.mjs")
  process.exit(0)
}

const root = repoRoot()
const suiteID = String(args.suite ?? DEFAULT_BENCHMARK_SUITE)
const plugins = csv(args.plugins, ["baseline", "tokenwarden", "openslimedit", "dcp", "openrtk"])
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
const resultsRoot = resolveResultsRoot(root, args.results, join("opencode", runID))
const workspaceRoot = resolve(String(args.workspace ?? join("/tmp", "tokenwarden-bench", runID)))

const suite = await loadSuite(suiteID)
const tasks = selectTasks(suite, taskIDs)
const adapters = await loadAdapters(plugins, "opencode")
let providerConfig = await loadLocalProviderConfig()
const interactive = !dryRun && !prepareOnly && process.stdin.isTTY && process.stdout.isTTY
let model = await selectBenchmarkModel({ requestedModel: args.model, interactive, selectFromOpencodeModels: interactive ? selectOpencodeAvailableModel : undefined })
ensureSelectedProviderModel(model)

log(`mode=${prepareOnly ? "prepare" : dryRun ? "dry" : "run"} run=${runID} model=${model}`)
log(`results=${resultsRoot}`)
log(`workspace=${workspaceRoot}`)
log(`plugins=${adapters.map((adapter) => adapter.id).join(",")} tasks=${tasks.map((task) => task.id).join(",")} runs=${runs} ai_timeout_ms=${aiTimeoutMs} verify_timeout_ms=${verifyTimeoutMs}`)

await rm(resultsRoot, { recursive: true, force: true })
await mkdir(resultsRoot, { recursive: true })

if (!dryRun && !prepareOnly) model = await preflightModel(model)

const summaries = []

for (let run = 1; run <= runs; run += 1) {
  for (const task of tasks) {
    for (const adapter of adapters) {
      log(`start adapter=${adapter.id} task=${task.id} run=${run}`)
      const workspace = await createRunWorkspace(workspaceRoot, { plugin: adapter.id, task: task.id, run, reuse: reusePrepared })
      const env = workspaceEnv(workspace)

      if (!dryRun && !prepareOnly) {
        const auth = await inheritOpencodeAuth(workspace)
        log(`auth inherited=${auth.copied ? "yes" : "no"} source=${auth.source}`)
      }

      const resultDir = join(resultsRoot, adapter.id, task.id, String(run))
      await mkdir(resultDir, { recursive: true })
      const config = await writeOpenCodeConfig(workspace.configPath, adapter, { model, provider: providerConfig })
      const taskRepo = String(args.repo ?? task.repo ?? suite.repo)
      const prompt = renderPrompt(task, { repo: taskRepo })

      const runStartedAt = Date.now()
      let failureStage = ""
      let failureMessage = ""
      let installActions = []
      let adapterPackageVersions = []
      let actualCommit
      let filesChanged = []
      let artifacts = []
      let permissionPrompts = []
      let opencodeVersionResult = { skipped: true, reason: prepareOnly ? "prepare-only" : "dry-run" }
      let cloneResult = { skipped: true, reason: prepareOnly ? "prepare-only" : "dry-run" }
      let setupResults = []
      let beforeStats = { skipped: true, reason: prepareOnly ? "prepare-only" : "dry-run" }
      let opencodeResult = { skipped: true, reason: prepareOnly ? "prepare-only" : "dry-run", usage: zeroUsage() }
      let verifyResult = { skipped: true, passed: false, results: [] }
      let afterStats = { skipped: true, reason: prepareOnly ? "prepare-only" : "dry-run" }
      let sessionExport = { skipped: true, reason: prepareOnly ? "prepare-only" : "dry-run" }
      let tokenwarden = { skipped: true, reason: adapter.tokenwardenReport ? (prepareOnly ? "prepare-only" : "dry-run") : "adapter does not emit TokenWarden report" }

      try {
        failureStage = "install"
        const providerInstallActions = await installProviderDependencies(workspace, providerPackages(providerConfig, providerIDFromModel(model)), { dryRun: reusePrepared || (dryRun && !prepareOnly), env, timeoutMs: installTimeoutMs })
        installActions = [...providerInstallActions, ...await installAdapterDependencies(adapter, workspace, { dryRun: reusePrepared || (dryRun && !prepareOnly), env, repoRoot: root, timeoutMs: installTimeoutMs, utilityTimeoutMs })]
        if (reusePrepared) {
          const prepared = await readPreparedState(workspace)
          cloneResult = prepared.clone
          setupResults = prepared.setup
          actualCommit = await currentCommit(workspace.repo, env)
        }
        if (!dryRun || prepareOnly) {
          opencodeVersionResult = await opencodeVersion(env, utilityTimeoutMs)
          adapterPackageVersions = await installedPackageVersions(adapter.npmPackages ?? [], workspace.configDir)
        }

        if ((!dryRun || prepareOnly) && !reusePrepared) {
          failureStage = "clone"
          log(`clone adapter=${adapter.id} task=${task.id} run=${run} timeout_ms=${cloneTimeoutMs}`)
          cloneResult = await cloneRepo(taskRepo, workspace.repo, { branch: task.defaultBranch, commit: task.commit, env, timeoutMs: cloneTimeoutMs })
          if (cloneResult.code !== 0) throw new Error(commandFailureMessage("git clone failed", cloneResult))
          actualCommit = await currentCommit(workspace.repo, env)

          failureStage = "setup"
          log(`setup adapter=${adapter.id} task=${task.id} run=${run} timeout_ms=${setupTimeoutMs}`)
          setupResults = await runSetupCommands(task.setup, workspace.repo, env, { fixturesDir: join(root, "bench", "fixtures") }, { timeoutMs: setupTimeoutMs })
          if (setupResults.some((result) => result.code !== 0)) throw new Error(commandFailureMessage(`setup failed for ${task.id}`, setupResults.find((result) => result.code !== 0)))
          await writePreparedState(workspace, { clone: cloneResult, setup: setupResults, commit: actualCommit })
        }

        if (!dryRun && !prepareOnly) {
          failureStage = "opencode-stats-before"
          log(`opencode stats before adapter=${adapter.id} task=${task.id} run=${run}`)
          beforeStats = await opencodeStats(workspace.repo, env, utilityTimeoutMs)
          failureStage = "opencode-run"
          log(`ai request adapter=${adapter.id} task=${task.id} run=${run} timeout_ms=${aiTimeoutMs}`)
          opencodeResult = await runOpencodeTask({ env, model, prompt, repoPath: workspace.repo, title: `${suite.id}:${task.id}:${adapter.id}:run-${run}`, timeoutMs: aiTimeoutMs })
          failureStage = "session-export"
          log(`export session adapter=${adapter.id} task=${task.id} run=${run}`)
          sessionExport = await exportSession(opencodeResult.usage.sessionIDs?.[0], join(resultDir, "session.export.json"), env, utilityTimeoutMs)
          failureStage = "verify"
          log(`verify adapter=${adapter.id} task=${task.id} run=${run} timeout_ms=${verifyTimeoutMs}`)
          verifyResult = await runVerifyCommands(task.verify, workspace.repo, env, { timeoutMs: verifyTimeoutMs })
          failureStage = "opencode-stats-after"
          log(`opencode stats after adapter=${adapter.id} task=${task.id} run=${run}`)
          afterStats = await opencodeStats(workspace.repo, env, utilityTimeoutMs)
          if (adapter.tokenwardenReport) tokenwarden = await tokenWardenReport(workspace.tokenwardenHome, env, utilityTimeoutMs)
          filesChanged = await changedFiles(workspace.repo, env)
          artifacts = await collectArtifacts(task.artifacts, workspace.repo)
        }
        failureStage = ""
      } catch (error) {
        if (error?.result && failureStage === "opencode-run") opencodeResult = error.result
        failureMessage = error?.stack ?? error?.message ?? String(error)
      } finally {
        permissionPrompts = await collectPermissionPrompts(workspace.data)
        if (permissionPrompts.length && !failureMessage) {
          failureStage = "permissions"
          failureMessage = `OpenCode requested denied permissions: ${permissionPrompts.join(" | ")}`
        }
      }

      await writeFile(join(resultDir, "opencode.config.json"), `${JSON.stringify(config, null, 2)}\n`, "utf8")
      await writeFile(join(resultDir, "prompt.md"), `${prompt}\n`, "utf8")
      await writeFile(join(resultDir, "stdout.jsonl"), opencodeResult.stdout ?? "", "utf8")
      await writeFile(join(resultDir, "stderr.log"), opencodeResult.stderr ?? "", "utf8")
      await writeFile(join(resultDir, "answer.md"), `${opencodeResult.usage?.answer ?? ""}\n`, "utf8")
      await writeFile(join(resultDir, "verify.log"), formatVerifyLog(verifyResult), "utf8")
      await writeFile(join(resultDir, "stats.before.txt"), beforeStats.stdout ?? "", "utf8")
      await writeFile(join(resultDir, "stats.after.txt"), afterStats.stdout ?? "", "utf8")
      await writeFile(join(resultDir, "tokenwarden-report.txt"), tokenwarden.stdout ?? "", "utf8")

      const summary = {
        platform: "opencode",
        runID,
        suite: suite.id,
        repo: taskRepo,
        requestedCommit: task.commit,
        commit: actualCommit,
        plugin: adapter.id,
        pluginLabel: adapter.label,
        task: task.id,
        run,
        dryRun,
        prepareOnly,
        reusePrepared,
        model,
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
        pluginsEnabled: adapter.plugins,
        adapterPackages: adapter.npmPackages ?? [],
        adapterPackageVersions,
        installActions,
        clone: summarizeCommand(cloneResult),
        setup: setupResults.map(summarizeCommand),
        opencodeVersion: summarizeCommand(opencodeVersionResult),
        opencodeStatsBefore: summarizeCommand(beforeStats),
        opencode: summarizeCommand(opencodeResult),
        verification: { passed: verifyResult.passed, commands: verifyResult.results?.map(summarizeCommand) ?? [] },
        sessionExport: summarizeCommand(sessionExport),
        opencodeStatsAfter: summarizeCommand(afterStats),
        tokenwardenReport: summarizeCommand(tokenwarden),
        changedFiles: filesChanged,
        artifacts,
        permissionPrompts,
        usage: opencodeResult.usage ?? zeroUsage()
      }
      summary.timedOut = commandTimedOut(summary)
      summaries.push(summary)
      await writeFile(join(resultDir, "summary.json"), `${JSON.stringify(summary, null, 2)}\n`, "utf8")
      process.stdout.write(`${prepareOnly ? "prepare" : dryRun ? "dry" : "run"}: ${adapter.id} ${task.id} #${run}\n`)
    }
  }
}

await writeFile(join(resultsRoot, "summary.json"), `${JSON.stringify(summaries, null, 2)}\n`, "utf8")
await writeFile(join(root, "bench", "results", "latest-opencode.json"), `${JSON.stringify({ platform: "opencode", runID, resultsRoot: relative(root, resultsRoot) }, null, 2)}\n`, "utf8")
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
  return [message, status, output].filter(Boolean).join("\n\n")
}

async function collectArtifacts(paths, cwd) {
  const artifacts = []
  for (const path of paths ?? []) {
    try {
      await access(join(cwd, path))
      artifacts.push({ path, exists: true })
    } catch {
      artifacts.push({ path, exists: false })
    }
  }
  return artifacts
}

function commandTimedOut(summary) {
  return [
    summary.opencodeVersion,
    summary.clone,
    ...(summary.setup ?? []),
    summary.opencodeStatsBefore,
    summary.opencode,
    ...(summary.verification?.commands ?? []),
    summary.sessionExport,
    summary.opencodeStatsAfter,
    summary.tokenwardenReport
  ].some((result) => result?.timedOut)
}

async function collectPermissionPrompts(dataDir) {
  try {
    const log = await readFile(join(dataDir, "opencode", "log", "opencode.log"), "utf8")
    return log
      .split(/\r?\n/)
      .filter((line) => /message=asking|status=denied|decision=deny/.test(line))
      .slice(-20)
  } catch (error) {
    if (error?.code === "ENOENT") return []
    return [`failed to read opencode permission log: ${error.message}`]
  }
}

async function installedPackageVersions(packages, configDir) {
  const versions = []
  for (const packageName of packages) {
    try {
      const packageJson = JSON.parse(await readFile(join(configDir, "node_modules", packageName, "package.json"), "utf8"))
      versions.push({ package: packageName, version: packageJson.version ?? "unknown" })
    } catch (error) {
      versions.push({ package: packageName, version: "unknown", error: error?.code ?? error?.message ?? String(error) })
    }
  }
  return versions
}

async function preflightModel(selectedModel) {
  const workspace = await createRunWorkspace(workspaceRoot, { plugin: "preflight", task: "model", run: 0 })
  const env = workspaceEnv(workspace)
  await writeOpenCodeConfig(workspace.configPath, { id: "preflight", plugins: [] }, { model: selectedModel, provider: providerConfig })
  await installProviderDependencies(workspace, providerPackages(providerConfig, providerIDFromModel(selectedModel)), { env })

  const auth = await inheritOpencodeAuth(workspace)
  log(`auth inherited=${auth.copied ? "yes" : "no"} source=${auth.source}`)
  if (providerIDFromModel(selectedModel) === "openrouter") {
    const authResult = await opencodeAuthList(env)
    if (authResult.code !== 0 || !hasOpenRouterAuth(authResult)) throw new Error(formatOpenRouterAuthFailure(authResult, auth))
    log("openrouter auth=found")
  }

  const modelsResult = await opencodeModels(providerIDFromModel(selectedModel), env)
  if (modelsResult.code === 0 && hasOpencodeModel(modelsResult, selectedModel, benchmarkModelAliases(selectedModel))) {
    log(`model available=${selectedModel}`)
    return selectedModel
  }

  if (interactive) {
    const available = unique([...opencodeModelIDs(modelsResult), ...configuredProviderModelIDs(providerConfig)])
    if (available.length) {
      const fallback = await selectAvailableModel(selectedModel, available)
      log(`model selected=${fallback}`)
      return fallback === selectedModel ? fallback : preflightModel(fallback)
    }
  }

  throw new Error(formatModelPreflightFailure(modelsResult, selectedModel))
}

async function selectOpencodeAvailableModel(options = {}) {
  const ask = options.question ?? prompt
  const providers = unique([...BENCHMARK_MODELS.map((model) => model.provider), ...Object.keys(providerConfig)])
  process.stdout.write("\nSelect OpenCode provider:\n")
  for (const [index, providerID] of providers.entries()) process.stdout.write(`${index + 1}. ${providerID}\n`)

  while (true) {
    const answer = await ask(`Provider [1-${providers.length}]: `)
    const selectedIndex = Number(answer.trim())
    if (!Number.isInteger(selectedIndex) || selectedIndex < 1 || selectedIndex > providers.length) {
      process.stdout.write(`Unknown provider selection: ${answer}\n`)
      continue
    }

    const providerID = providers[selectedIndex - 1]
    const workspace = await createRunWorkspace(workspaceRoot, { plugin: "preflight", task: `models-${providerID}`, run: 0 })
    const env = workspaceEnv(workspace)
    await writeOpenCodeConfig(workspace.configPath, { id: "preflight", plugins: [] }, { provider: providerConfig })
    await installProviderDependencies(workspace, providerPackages(providerConfig, providerID), { env })
    await inheritOpencodeAuth(workspace)

    const modelsResult = await opencodeModels(providerID, env)
    const lmStudioModels = providerID === "lmstudio" ? await lmStudioModelIDs(providerConfig[providerID]) : []
    for (const modelID of lmStudioModels) addProviderModel(providerID, modelID)

    const available = unique([
      ...opencodeModelIDs(modelsResult),
      ...configuredProviderModelIDs(providerConfig).filter((modelID) => providerIDFromModel(modelID) === providerID)
    ])
    if (!available.length) {
      process.stdout.write(`${formatModelPreflightFailure(modelsResult, `${providerID}/<model>`)}\n`)
      continue
    }

    const selected = await selectAvailableModel(`${providerID}/<model>`, available, { providerID, question: ask })
    if (providerIDFromModel(selected) === providerID) addProviderModel(providerID, selected.slice(providerID.length + 1))
    return selected
  }
}

async function selectAvailableModel(requestedModel, availableModels, options = {}) {
  const ask = options.question ?? prompt
  process.stdout.write(`\nSelected model is not available to opencode in the isolated workspace: ${requestedModel}\n`)
  process.stdout.write("Available models for this provider:\n")
  process.stdout.write("0. Type a model ID manually\n")
  for (const [index, availableModel] of availableModels.entries()) process.stdout.write(`${index + 1}. ${availableModel}\n`)
  while (true) {
    const answer = await ask(`Model [0-${availableModels.length}]: `)
    if (answer.trim() === "0") {
      const manual = (await ask("Model ID: ")).trim()
      if (manual) return fullModelID(options.providerID, manual)
    }
    const selectedIndex = Number(answer.trim())
    if (Number.isInteger(selectedIndex) && selectedIndex >= 1 && selectedIndex <= availableModels.length) return availableModels[selectedIndex - 1]
    process.stdout.write(`Unknown model selection: ${answer}\n`)
  }
}

async function lmStudioModelIDs(provider = {}) {
  const baseURL = provider?.options?.baseURL ?? "http://localhost:1234/v1"
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), DEFAULT_UTILITY_TIMEOUT_MS)
  try {
    const response = await fetch(`${baseURL.replace(/\/$/, "")}/models`, { signal: controller.signal })
    if (!response.ok) return []
    const payload = await response.json()
    return Array.isArray(payload?.data) ? payload.data.map((model) => model?.id).filter(Boolean) : []
  } catch {
    return []
  } finally {
    clearTimeout(timeout)
  }
}

function addProviderModel(providerID, modelID) {
  const provider = providerConfig[providerID] ?? defaultProvider(providerID)
  providerConfig = {
    ...providerConfig,
    [providerID]: {
      ...provider,
      models: {
        ...(provider.models ?? {}),
        [modelID]: provider.models?.[modelID] ?? defaultModelConfig(modelID)
      }
    }
  }
}

function ensureSelectedProviderModel(modelID) {
  const providerID = providerIDFromModel(modelID)
  if (providerID === "lmstudio") addProviderModel(providerID, modelID.slice(providerID.length + 1))
}

function defaultProvider(providerID) {
  if (providerID === "lmstudio") {
    const baseURL = (process.env.LMSTUDIO_BASE_URL ?? "http://localhost:1234").replace(/\/$/, "")
    return { npm: "@ai-sdk/openai-compatible", name: "LM Studio", options: { baseURL: `${baseURL}/v1` } }
  }
  return { models: {} }
}

function defaultModelConfig(modelID) {
  return {
    name: modelID,
    limit: { context: 128000, output: 4096 },
    modalities: { input: ["text"], output: ["text"] }
  }
}

function fullModelID(providerID, modelID) {
  if (!providerID || providerIDFromModel(modelID) === providerID) return modelID
  return `${providerID}/${modelID}`
}

function prompt(message) {
  return new Promise((resolve) => {
    process.stdout.write(message)
    process.stdin.once("data", (data) => resolve(String(data).trim()))
  })
}

function unique(values) {
  return [...new Set(values.filter(Boolean))]
}

function formatVerifyLog(verifyResult) {
  if (verifyResult.skipped) return `skipped: ${verifyResult.reason}\n`
  return verifyResult.results.map((result) => [`$ ${result.command}`, result.stdout, result.stderr, result.timedOut ? `timeout after ${result.durationMs}ms` : undefined, `exit=${result.code}`, result.signal ? `signal=${result.signal}` : undefined].filter(Boolean).join("\n")).join("\n\n")
}

function zeroUsage() {
  return { inputTokens: 0, outputTokens: 0, cacheReadTokens: 0, cacheWriteTokens: 0, totalTokens: 0, estimatedCostUsd: 0, sessionIDs: [], answer: "", rawEventCount: 0 }
}

function log(message) {
  process.stdout.write(`[bench] ${message}\n`)
}
