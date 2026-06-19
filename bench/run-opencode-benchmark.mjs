#!/usr/bin/env node
import { mkdir, rm, writeFile } from "node:fs/promises"
import { join, resolve } from "node:path"
import { parseArgs, csv, intArg } from "./lib/args.mjs"
import { loadAdapters } from "./lib/adapters.mjs"
import { DEFAULT_BENCHMARK_RUNS, configuredProviderModelIDs, loadLocalProviderConfig, providerPackages, writeOpenCodeConfig } from "./lib/config.mjs"
import { cloneRepo, runSetupCommands } from "./lib/git.mjs"
import { installAdapterDependencies, installProviderDependencies } from "./lib/install.mjs"
import { benchmarkModelAliases, selectBenchmarkModel } from "./lib/models.mjs"
import { exportSession, formatModelPreflightFailure, formatOpenRouterAuthFailure, hasOpencodeModel, hasOpenRouterAuth, opencodeAuthList, opencodeModelIDs, opencodeModels, opencodeStats, providerIDFromModel, runOpencodeTask, tokenWardenReport } from "./lib/opencode.mjs"
import { loadSuite, renderPrompt, selectTasks } from "./lib/tasks.mjs"
import { runVerifyCommands } from "./lib/verify.mjs"
import { createRunWorkspace, inheritOpencodeAuth, repoRoot, resolveResultsRoot, timestampID, workspaceEnv } from "./lib/workspace.mjs"

const args = parseArgs(process.argv.slice(2))
const root = repoRoot()
const suiteID = String(args.suite ?? "hono.v1")
const plugins = csv(args.plugins, ["baseline", "tokenwarden", "openslimedit", "dcp", "openrtk"])
const taskIDs = csv(args.tasks, [])
const runs = intArg(args.runs, DEFAULT_BENCHMARK_RUNS)
const dryRun = Boolean(args.dryRun)
const prepareOnly = Boolean(args.prepareOnly)
const interactive = !dryRun && !prepareOnly && process.stdin.isTTY && process.stdout.isTTY
let model = await selectBenchmarkModel({ requestedModel: args.model, interactive })
const runID = String(args.runId ?? timestampID())
const resultsRoot = resolveResultsRoot(root, args.results, runID)
const workspaceRoot = resolve(String(args.workspace ?? join("/tmp", "tokenwarden-bench", runID)))

const suite = await loadSuite(suiteID)
const tasks = selectTasks(suite, taskIDs)
const adapters = await loadAdapters(plugins)
const providerConfig = await loadLocalProviderConfig()

log(`mode=${prepareOnly ? "prepare" : dryRun ? "dry" : "run"} run=${runID} model=${model}`)
log(`results=${resultsRoot}`)
log(`workspace=${workspaceRoot}`)
log(`plugins=${adapters.map((adapter) => adapter.id).join(",")} tasks=${tasks.map((task) => task.id).join(",")} runs=${runs}`)

await rm(resultsRoot, { recursive: true, force: true })
await mkdir(resultsRoot, { recursive: true })

if (!dryRun && !prepareOnly) model = await preflightModel(model)

const summaries = []

for (let run = 1; run <= runs; run += 1) {
  for (const task of tasks) {
    for (const adapter of adapters) {
      log(`start adapter=${adapter.id} task=${task.id} run=${run}`)
      const workspace = await createRunWorkspace(workspaceRoot, { plugin: adapter.id, task: task.id, run })
      const env = workspaceEnv(workspace)

      if (!dryRun && !prepareOnly) {
        const auth = await inheritOpencodeAuth(workspace)
        log(`auth inherited=${auth.copied ? "yes" : "no"} source=${auth.source}`)
      }

      const resultDir = join(resultsRoot, adapter.id, task.id, String(run))
      await mkdir(resultDir, { recursive: true })
      const config = await writeOpenCodeConfig(workspace.configPath, adapter, { model, provider: providerConfig })
      const prompt = renderPrompt(task, { repo: suite.repo })
      const providerInstallActions = await installProviderDependencies(workspace, providerPackages(providerConfig, providerIDFromModel(model)), { dryRun: dryRun && !prepareOnly, env })
      const installActions = [...providerInstallActions, ...await installAdapterDependencies(adapter, workspace, { dryRun: dryRun && !prepareOnly, env, repoRoot: root })]

      let cloneResult = { skipped: true, reason: prepareOnly ? "prepare-only" : "dry-run" }
      let setupResults = []
      let beforeStats = { skipped: true, reason: prepareOnly ? "prepare-only" : "dry-run" }
      let opencodeResult = { skipped: true, reason: prepareOnly ? "prepare-only" : "dry-run", usage: zeroUsage() }
      let verifyResult = { skipped: true, passed: false, results: [] }
      let afterStats = { skipped: true, reason: prepareOnly ? "prepare-only" : "dry-run" }
      let sessionExport = { skipped: true, reason: prepareOnly ? "prepare-only" : "dry-run" }
      let tokenwarden = { skipped: true, reason: adapter.tokenwardenReport ? (prepareOnly ? "prepare-only" : "dry-run") : "adapter does not emit TokenWarden report" }

      if (!dryRun || prepareOnly) {
        log(`clone adapter=${adapter.id} task=${task.id} run=${run}`)
        cloneResult = await cloneRepo(String(args.repo ?? suite.repo), workspace.repo, { branch: suite.defaultBranch, env })
        if (cloneResult.code !== 0) throw new Error(`git clone failed: ${cloneResult.stderr || cloneResult.stdout}`)
        log(`setup adapter=${adapter.id} task=${task.id} run=${run}`)
        setupResults = await runSetupCommands(task.setup, workspace.repo, env, { fixturesDir: join(root, "bench", "fixtures") })
        if (setupResults.some((result) => result.code !== 0)) throw new Error(`setup failed for ${task.id}`)
      }

      if (!dryRun && !prepareOnly) {
        log(`opencode stats before adapter=${adapter.id} task=${task.id} run=${run}`)
        beforeStats = await opencodeStats(workspace.repo, env)
        log(`ai request adapter=${adapter.id} task=${task.id} run=${run}`)
        opencodeResult = await runOpencodeTask({ env, model, prompt, repoPath: workspace.repo, title: `${suite.id}:${task.id}:${adapter.id}:run-${run}` })
        log(`export session adapter=${adapter.id} task=${task.id} run=${run}`)
        sessionExport = await exportSession(opencodeResult.usage.sessionIDs?.[0], join(resultDir, "session.export.json"), env)
        log(`verify adapter=${adapter.id} task=${task.id} run=${run}`)
        verifyResult = await runVerifyCommands(task.verify, workspace.repo, env)
        log(`opencode stats after adapter=${adapter.id} task=${task.id} run=${run}`)
        afterStats = await opencodeStats(workspace.repo, env)
        if (adapter.tokenwardenReport) tokenwarden = await tokenWardenReport(workspace.tokenwardenHome, env)
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
        runID,
        suite: suite.id,
        repo: String(args.repo ?? suite.repo),
        plugin: adapter.id,
        pluginLabel: adapter.label,
        task: task.id,
        run,
        dryRun,
        prepareOnly,
        model,
        resultDir,
        workspace: workspace.root,
        pluginsEnabled: adapter.plugins,
        installActions,
        clone: summarizeCommand(cloneResult),
        setup: setupResults.map(summarizeCommand),
        opencode: summarizeCommand(opencodeResult),
        verification: { passed: verifyResult.passed, commands: verifyResult.results?.map(summarizeCommand) ?? [] },
        sessionExport: summarizeCommand(sessionExport),
        usage: opencodeResult.usage ?? zeroUsage()
      }
      summaries.push(summary)
      await writeFile(join(resultDir, "summary.json"), `${JSON.stringify(summary, null, 2)}\n`, "utf8")
      process.stdout.write(`${prepareOnly ? "prepare" : dryRun ? "dry" : "run"}: ${adapter.id} ${task.id} #${run}\n`)
    }
  }
}

await writeFile(join(resultsRoot, "summary.json"), `${JSON.stringify(summaries, null, 2)}\n`, "utf8")
await writeFile(join(root, "bench", "results", "latest.json"), `${JSON.stringify({ runID, resultsRoot }, null, 2)}\n`, "utf8")
process.stdout.write(`results: ${resultsRoot}\n`)

function summarizeCommand(result) {
  if (!result) return undefined
  if (result.skipped) return result
  return {
    command: result.command,
    args: result.args,
    code: result.code,
    signal: result.signal,
    durationMs: result.durationMs,
    stdoutBytes: Buffer.byteLength(result.stdout ?? ""),
    stderrBytes: Buffer.byteLength(result.stderr ?? "")
  }
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

async function selectAvailableModel(requestedModel, availableModels) {
  process.stdout.write(`\nSelected model is not available to opencode in the isolated workspace: ${requestedModel}\n`)
  process.stdout.write("Available models for this provider:\n")
  for (const [index, availableModel] of availableModels.entries()) process.stdout.write(`${index + 1}. ${availableModel}\n`)
  while (true) {
    const answer = await prompt(`Model [1-${availableModels.length}]: `)
    const selectedIndex = Number(answer.trim())
    if (Number.isInteger(selectedIndex) && selectedIndex >= 1 && selectedIndex <= availableModels.length) return availableModels[selectedIndex - 1]
    process.stdout.write(`Unknown model selection: ${answer}\n`)
  }
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
  return verifyResult.results.map((result) => [`$ ${result.command}`, result.stdout, result.stderr, `exit=${result.code}`].filter(Boolean).join("\n")).join("\n\n")
}

function zeroUsage() {
  return { inputTokens: 0, outputTokens: 0, cacheReadTokens: 0, cacheWriteTokens: 0, totalTokens: 0, estimatedCostUsd: 0, sessionIDs: [], answer: "", rawEventCount: 0 }
}

function log(message) {
  process.stdout.write(`[bench] ${message}\n`)
}
