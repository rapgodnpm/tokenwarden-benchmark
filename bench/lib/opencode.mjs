import { mkdir, writeFile } from "node:fs/promises"
import { dirname } from "node:path"
import { DEFAULT_AI_TIMEOUT_MS, DEFAULT_UTILITY_TIMEOUT_MS } from "./config.mjs"
import { commandLine, runCommand } from "./process.mjs"
import { parseUsageFromJsonLines } from "./usage.mjs"

export async function runOpencodeTask(input) {
  const args = [
    "run",
    "--format",
    "json",
    "--model",
    input.model,
    "--dir",
    input.repoPath,
    "--title",
    input.title,
    input.prompt
  ]
  const displayCommand = commandLine("opencode", [...args.slice(0, -1), "<prompt>"])
  const result = await runCommand("opencode", args, { env: input.env, timeoutMs: input.timeoutMs ?? DEFAULT_AI_TIMEOUT_MS, killProcessGroup: true })
  const usage = parseUsageFromJsonLines(result.stdout)
  const output = { ...result, args, usage, commandLine: displayCommand }
  if (result.code !== 0) throw aiRequestError(displayCommand, output, result.timedOut ? "AI request timed out" : "AI request failed")
  if (usage.rawEventCount === 0) throw aiRequestError(displayCommand, output, "AI request produced no parseable opencode JSON output")
  return output
}

function aiRequestError(command, result, reason) {
  const error = new Error(formatAiRequestFailure(command, result, reason))
  error.result = result
  return error
}

export function formatAiRequestFailure(command, result, reason) {
  const status = result.signal ? `signal=${result.signal}` : `exit=${result.code}`
  const parts = [`${reason}: ${command}`, status]
  const stderr = result.stderr?.trim()
  const stdout = result.stdout?.trim()
  if (stderr) parts.push(`stderr:\n${stderr}`)
  if (stdout) parts.push(`stdout:\n${stdout}`)
  return parts.join("\n\n")
}

export async function exportSession(sessionID, outputPath, env, timeoutMs = DEFAULT_UTILITY_TIMEOUT_MS) {
  if (!sessionID) return { skipped: true, reason: "no session ID found" }
  const result = await runCommand("opencode", ["export", sessionID], { env, timeoutMs, killProcessGroup: true })
  await mkdir(dirname(outputPath), { recursive: true })
  await writeFile(outputPath, result.stdout, "utf8")
  return result
}

export async function opencodeStats(projectPath, env, timeoutMs = DEFAULT_UTILITY_TIMEOUT_MS) {
  return runCommand("opencode", ["stats", "--project", projectPath, "--models"], { env, timeoutMs, killProcessGroup: true })
}

export async function opencodeVersion(env, timeoutMs = DEFAULT_UTILITY_TIMEOUT_MS) {
  return runCommand("opencode", ["--version"], { env, timeoutMs })
}

export async function opencodeAuthList(env, timeoutMs = DEFAULT_UTILITY_TIMEOUT_MS) {
  return runCommand("opencode", ["auth", "list"], { env, timeoutMs })
}

export async function opencodeModels(providerID, env, timeoutMs = DEFAULT_UTILITY_TIMEOUT_MS) {
  return runCommand("opencode", ["models", providerID], { env, timeoutMs })
}

export function hasOpenRouterAuth(result) {
  return /openrouter/i.test(`${result.stdout ?? ""}\n${result.stderr ?? ""}`)
}

export function hasOpencodeModel(result, model, aliases = []) {
  const lines = opencodeModelIDs(result)
  const expected = new Set([model, ...aliases].filter(Boolean))
  return lines.some((line) => expected.has(line))
}

export function opencodeModelIDs(result) {
  const output = stripAnsi(`${result.stdout ?? ""}\n${result.stderr ?? ""}`)
  return output.split(/\r?\n/).map((line) => line.trim()).filter(Boolean)
}

export function formatOpenRouterAuthFailure(result, auth) {
  const status = result.signal ? `signal=${result.signal}` : `exit=${result.code}`
  const source = auth.copied ? auth.source : `${auth.source} (${auth.reason ?? "not copied"})`
  const parts = [
    "OpenRouter auth not found in isolated benchmark workspace.",
    "The benchmark automatically inherits your local opencode auth file for real runs, but OpenRouter was still unavailable.",
    `source auth: ${source}`,
    `workspace auth: ${auth.destination}`,
    `preflight: opencode auth list (${status})`,
    "Run `opencode auth login openrouter` in your normal opencode environment, then rerun the benchmark."
  ]
  const stderr = result.stderr?.trim()
  const stdout = result.stdout?.trim()
  if (stderr) parts.push(`stderr:\n${stderr}`)
  if (stdout) parts.push(`stdout:\n${stdout}`)
  return parts.join("\n\n")
}

export function formatModelPreflightFailure(result, model) {
  const providerID = providerIDFromModel(model)
  const status = result.signal ? `signal=${result.signal}` : `exit=${result.code}`
  const parts = [
    `Benchmark model is not available to opencode in the isolated workspace: ${model}`,
    `preflight: opencode models ${providerID} (${status})`,
    "Run `opencode models` in your normal environment to confirm the exact model ID, then pass it with `--model`."
  ]
  const stderr = result.stderr?.trim()
  const stdout = result.stdout?.trim()
  if (stderr) parts.push(`stderr:\n${stderr}`)
  if (stdout) parts.push(`stdout:\n${stdout}`)
  return parts.join("\n\n")
}

export function providerIDFromModel(model) {
  return String(model).split("/")[0]
}

function stripAnsi(value) {
  return value.replace(/\x1b\[[0-9;]*m/g, "")
}

export async function tokenWardenReport(dataDir, env, timeoutMs = DEFAULT_UTILITY_TIMEOUT_MS) {
  return runCommand("tokenwarden", ["report", "--data-dir", dataDir], { env, timeoutMs })
}
