#!/usr/bin/env node
import { spawn } from "node:child_process"
import { lstat, mkdir, mkdtemp, realpath, rm } from "node:fs/promises"
import { tmpdir } from "node:os"
import { dirname, join, relative, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import { persistDockerResults, preserveFailedDockerResults } from "./lib/docker-results.mjs"

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const composePath = join(root, "compose.yaml")
const resultsRoot = join(root, "bench", "results")
const [command = "test", ...rawArgs] = process.argv.slice(2)
const invocation = `${Date.now()}-${process.pid}`
const projectName = `tokenwarden-bench-${invocation}`
const temporaryRoot = await mkdtemp(join(tmpdir(), "tokenwarden-benchmark-"))
const resultsStage = join(temporaryRoot, "results")
const emptyTokenWardenRoot = join(temporaryRoot, "empty-tokenwarden-workspace")
const emptyTokenWardenPaths = {
  claudePackage: join(emptyTokenWardenRoot, "packages", "claude-code"),
  corePackage: join(emptyTokenWardenRoot, "packages", "core"),
  mcpPackage: join(emptyTokenWardenRoot, "packages", "mcp"),
  nodeModules: join(emptyTokenWardenRoot, "node_modules")
}
await Promise.all([
  mkdir(resultsStage, { recursive: true }),
  ...Object.values(emptyTokenWardenPaths).map((path) => mkdir(path, { recursive: true }))
])

const localTokenWarden = resolve(process.env.TOKENWARDEN_CLAUDE_PACKAGE ?? join(root, "..", "token-optimizer", "packages", "claude-code"))
const localTokenWardenRoot = resolve(process.env.TOKENWARDEN_WORKSPACE_ROOT ?? join(localTokenWarden, "..", ".."))
const requestedTokenWardenPaths = {
  claudePackage: localTokenWarden,
  corePackage: join(localTokenWardenRoot, "packages", "core"),
  mcpPackage: join(localTokenWardenRoot, "packages", "mcp"),
  nodeModules: join(localTokenWardenRoot, "node_modules")
}
const tokenWardenPaths = {}
const missingTokenWardenPaths = []
for (const [name, path] of Object.entries(requestedTokenWardenPaths)) {
  if (await exists(path)) tokenWardenPaths[name] = await realpath(path)
  else {
    tokenWardenPaths[name] = emptyTokenWardenPaths[name]
    missingTokenWardenPaths.push(path)
  }
}
const composeEnv = {
  ...process.env,
  PROJECT_ROOT: await realpath(root),
  RESULTS_STAGE: resultsStage,
  TOKENWARDEN_CLAUDE_PACKAGE_HOST: tokenWardenPaths.claudePackage,
  TOKENWARDEN_CORE_PACKAGE_HOST: tokenWardenPaths.corePackage,
  TOKENWARDEN_MCP_PACKAGE_HOST: tokenWardenPaths.mcpPackage,
  TOKENWARDEN_NODE_MODULES_HOST: tokenWardenPaths.nodeModules,
  HOST_UID: String(process.getuid?.() ?? 1000),
  HOST_GID: String(process.getgid?.() ?? 1000),
  COMPOSE_PROJECT_NAME: projectName
}

let activeChild
let receivedSignal
for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => {
    receivedSignal = signal
    activeChild?.kill(signal)
  })
}

let exitCode = 0
try {
  await requireDocker(composeEnv)
  await compose(["build", "test"], composeEnv)
  const initCode = await composeRun("workspace-init", [], composeEnv)
  if (initCode !== 0) throw new Error(`workspace initialization failed with exit code ${initCode}`)

  if (command === "test") {
    exitCode = await composeRun("test", ["node", "--test", ...rawArgs], composeEnv)
  } else if (command === "opencode" || command === "claude-code") {
    requireLocalPlugin(command, rawArgs, missingTokenWardenPaths)
    exitCode = await runBenchmark(command, rawArgs, composeEnv)
  } else if (command === "opencode-prepare" || command === "claude-code-prepare") {
    const platform = command.replace(/-prepare$/, "")
    requireLocalPlugin(platform, rawArgs, missingTokenWardenPaths)
    exitCode = await runSingle(platform, [...benchmarkArgs(rawArgs), "--prepare-only", "--workspace", "/work"], "prepare", composeEnv)
    await persistDockerResults({ stage: resultsStage, destination: resultsRoot, repoRoot: root, id: invocation, platform })
  } else if (command === "opencode-dry" || command === "claude-code-dry") {
    const platform = command.replace(/-dry$/, "")
    exitCode = await runSingle(platform, [...benchmarkArgs(rawArgs), "--dry-run", "--workspace", "/work"], "prepare", composeEnv)
    await persistDockerResults({ stage: resultsStage, destination: resultsRoot, repoRoot: root, id: invocation, platform })
  } else if (command === "report-opencode" || command === "report-claude-code") {
    const platform = command.replace(/^report-/, "")
    composeEnv.RESULTS_STAGE = resultsRoot
    exitCode = await composeRun("report", ["node", "bench/report.mjs", "--platform", platform, "--no-open", ...reportArgs(rawArgs)], composeEnv)
  } else {
    throw new Error(`unknown Docker benchmark command: ${command}`)
  }
} catch (error) {
  process.stderr.write(`${error?.stack ?? error}\n`)
  exitCode = exitCode || 1
  try {
    await preserveFailedDockerResults({ stage: resultsStage, destination: resultsRoot, repoRoot: root, id: invocation })
  } catch (preserveError) {
    process.stderr.write(`failed to preserve staged diagnostics: ${preserveError?.message ?? preserveError}\n`)
  }
} finally {
  await compose(["down", "--volumes", "--remove-orphans"], composeEnv, { allowFailure: true })
  await rm(temporaryRoot, { recursive: true, force: true })
}

process.exitCode = receivedSignal === "SIGINT" ? 130 : receivedSignal === "SIGTERM" ? 143 : exitCode

async function runBenchmark(platform, args, env) {
  const selectedArgs = benchmarkArgs(args)
  process.stdout.write(`phase: checking Docker-to-LM-Studio connectivity and model availability\n`)
  let code = await composeRun("benchmark", ["node", "bench/check-lmstudio.mjs", "--platform", platform, "--model", optionValue(selectedArgs, "model")], env)
  if (code !== 0) {
    await compose(["logs", "--no-color", "lmstudio-proxy"], env, { allowFailure: true })
    process.stderr.write(`LM Studio preflight failed with exit code ${code}; preparation and model execution were not started\n`)
    return code
  }
  await compose(["rm", "--force", "--stop", "lmstudio-proxy"], env)
  process.stdout.write(`phase: preparing ${platform} workspaces; LM Studio is not used during this phase\n`)
  code = await runSingle(platform, [...selectedArgs, "--prepare-only", "--workspace", "/work"], "prepare", env)
  if (code !== 0) {
    process.stderr.write(`preparation failed with exit code ${code}; the LM Studio proxy was not restarted and the model benchmark was not started\n`)
    await persistDockerResults({ stage: resultsStage, destination: resultsRoot, repoRoot: root, id: invocation, platform })
    env.RESULTS_STAGE = resultsRoot
    await composeRun("report", ["node", "bench/report.mjs", "--platform", platform, "--no-open"], env)
    return code
  }
  await rm(resultsStage, { recursive: true, force: true })
  await mkdir(resultsStage, { recursive: true })
  process.stdout.write(`phase: running ${platform} model benchmark through LM Studio\n`)
  code = await runSingle(platform, [...selectedArgs, "--reuse-prepared", "--workspace", "/work"], "benchmark", env)
  await persistDockerResults({ stage: resultsStage, destination: resultsRoot, repoRoot: root, id: invocation, platform })
  env.RESULTS_STAGE = resultsRoot
  const reportCode = await composeRun("report", ["node", "bench/report.mjs", "--platform", platform, "--no-open"], env)
  if (code === 0) code = reportCode
  return code
}

function benchmarkArgs(args) {
  const result = stripOptions(args, new Set(["prepare-only", "dry-run", "reuse-prepared", "workspace", "results", "lmstudio-base-url"]))
  if (!hasOption(result, "model")) result.push("--model", "lmstudio-qwen3.5-9b")
  const model = optionValue(result, "model")
  if (!["lmstudio-qwen3.5-9b", "lmstudio/qwen/qwen3.5-9b", "qwen/qwen3.5-9b"].includes(model)) {
    throw new Error(`Docker benchmarks support only the local LM Studio model, received: ${model}`)
  }
  return result
}

function reportArgs(args) {
  const output = stripOptions(args, new Set(["no-open"]))
  const requested = optionValue(output, "results")
  if (!requested) return output
  const hostPath = resolve(root, requested)
  const relativePath = relative(resultsRoot, hostPath)
  if (!relativePath || relativePath.startsWith("..") || relativePath.split(/[\\/]/).includes("..")) {
    throw new Error(`report results must be a generated directory under ${resultsRoot}`)
  }
  const translated = stripOptions(output, new Set(["results"]))
  translated.push("--results", join("/workspace/bench/results", relativePath))
  return translated
}

async function runSingle(platform, args, service, env) {
  const script = platform === "opencode" ? "bench/run-opencode-benchmark.mjs" : "bench/run-claude-code-benchmark.mjs"
  return composeRun(service, ["node", script, ...args], env)
}

function requireLocalPlugin(platform, args, missingPaths) {
  if (platform !== "claude-code" || !selectedPlugins(args).includes("tokenwarden")) return
  if (missingPaths.length) {
    throw new Error([
      "TokenWarden Claude package workspace is incomplete.",
      ...missingPaths.map((path) => `Missing: ${path}`),
      "Set TOKENWARDEN_CLAUDE_PACKAGE to packages/claude-code and TOKENWARDEN_WORKSPACE_ROOT to its npm workspace root."
    ].join("\n"))
  }
}

function selectedPlugins(args) {
  const option = optionValue(args, "plugins")
  return option ? option.split(",").map((value) => value.trim()) : ["baseline", "tokenwarden", "context-mode", "rtk", "caveman"]
}

function stripOptions(args, names) {
  const output = []
  for (let index = 0; index < args.length; index += 1) {
    const value = args[index]
    if (!value.startsWith("--")) {
      output.push(value)
      continue
    }
    const name = value.slice(2).split("=", 1)[0]
    if (!names.has(name)) {
      output.push(value)
      continue
    }
    if (!value.includes("=") && args[index + 1] && !args[index + 1].startsWith("--")) index += 1
  }
  return output
}

function hasOption(args, name) {
  return args.some((arg) => arg === `--${name}` || arg.startsWith(`--${name}=`))
}

function optionValue(args, name) {
  for (let index = 0; index < args.length; index += 1) {
    if (args[index].startsWith(`--${name}=`)) return args[index].slice(name.length + 3)
    if (args[index] === `--${name}`) return args[index + 1]
  }
}

async function composeRun(service, commandArgs, env) {
  return compose(["run", "--rm", service, ...commandArgs], env, { allowFailure: true })
}

async function compose(args, env, options = {}) {
  const code = await spawnCommand("docker", ["compose", "--file", composePath, "--project-name", projectName, ...args], env)
  if (code !== 0 && !options.allowFailure) throw new Error(`docker compose failed with exit code ${code}`)
  return code
}

async function requireDocker(env) {
  const code = await spawnCommand("docker", ["info", "--format", "{{.ServerVersion}}"], env, { quiet: true })
  if (code !== 0) throw new Error("Docker is unavailable. Start Docker Desktop and rerun the command.")
}

async function spawnCommand(commandName, args, env, options = {}) {
  return new Promise((resolveCode) => {
    const child = spawn(commandName, args, { cwd: root, env, stdio: options.quiet ? "ignore" : "inherit" })
    activeChild = child
    child.on("error", (error) => {
      if (!options.quiet) process.stderr.write(`${error.message}\n`)
      resolveCode(127)
    })
    child.on("close", (code) => {
      if (activeChild === child) activeChild = undefined
      resolveCode(code ?? 1)
    })
  })
}

async function exists(path) {
  try {
    await lstat(path)
    return true
  } catch (error) {
    if (error?.code === "ENOENT") return false
    throw error
  }
}
