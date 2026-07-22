import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { commandLine, runCommand } from "./process.mjs"

export const CLAUDE_CODE_PLATFORM = "claude-code"
export const DEFAULT_LMSTUDIO_BASE_URL = "http://localhost:1234"
export const CLAUDE_CODE_TOOLS = "Bash,Read,Edit,Write,Glob,Grep"

export function createClaudeCodeSettings() {
  return {
    permissions: {
      defaultMode: "bypassPermissions"
    }
  }
}

export function createTokenWardenMcpConfig(pluginDir) {
  return {
    mcpServers: {
      tokenwarden: {
        command: "node",
        args: [join(pluginDir, "dist", "src", "mcp-server.js")]
      }
    }
  }
}

export function createClaudeCodeEnv(workspace, baseEnv = process.env, options = {}) {
  const env = {
    ...baseEnv,
    HOME: workspace.home,
    CLAUDE_CONFIG_DIR: workspace.claudeConfigDir,
    TOKENWARDEN_HOME: workspace.tokenwardenHome,
    ANTHROPIC_BASE_URL: options.baseURL ?? DEFAULT_LMSTUDIO_BASE_URL,
    ANTHROPIC_AUTH_TOKEN: options.authToken ?? baseEnv.LM_API_TOKEN ?? "lmstudio",
    CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC: "1",
    CLAUDE_CODE_DISABLE_OFFICIAL_MARKETPLACE_AUTOINSTALL: "1",
    DISABLE_AUTOUPDATER: "1",
    DISABLE_TELEMETRY: "1"
  }
  delete env.ANTHROPIC_API_KEY
  return env
}

export async function runClaudeCodeTask(options) {
  const args = [
    "-p",
    options.prompt,
    "--output-format",
    "stream-json",
    "--verbose",
    "--model",
    options.model,
    "--permission-mode",
    "bypassPermissions",
    "--tools",
    CLAUDE_CODE_TOOLS,
    "--no-session-persistence",
    "--no-chrome",
    "--settings",
    options.settingsPath
  ]
  if (!options.allowMcp) args.push("--disallowedTools", "mcp__*")
  if (options.mcpConfigPath) args.push("--mcp-config", options.mcpConfigPath)
  for (const pluginDir of options.pluginDirs ?? []) args.push("--plugin-dir", pluginDir)

  const displayCommand = commandLine("claude", args)
  const result = await runCommand("claude", args, {
    cwd: options.repoPath,
    env: options.env,
    timeoutMs: options.timeoutMs,
    killProcessGroup: true
  })
  const usage = parseClaudeCodeJsonLines(result.stdout)
  const output = { ...result, args, usage, commandLine: displayCommand }
  if (result.code !== 0) throw aiRequestError(displayCommand, output, result.timedOut ? "AI request timed out" : "AI request failed")
  if (usage.rawEventCount === 0 || !usage.resultEventFound) throw aiRequestError(displayCommand, output, "AI request produced no parseable Claude Code result event")
  return output
}

export function parseClaudeCodeJsonLines(text) {
  const events = []
  let resultEvent
  const sessionIDs = new Set()
  const pluginErrors = []
  const loadedPlugins = []
  const mcpServers = []
  const tools = []

  for (const line of text.split(/\r?\n/)) {
    if (!line.trim()) continue
    try {
      const event = JSON.parse(line)
      events.push(event)
      if (event.session_id) sessionIDs.add(event.session_id)
      if (event.type === "result") resultEvent = event
      if (Array.isArray(event.plugins)) loadedPlugins.push(...event.plugins.map(pluginName).filter(Boolean))
      if (Array.isArray(event.plugin_errors)) pluginErrors.push(...event.plugin_errors)
      if (Array.isArray(event.mcp_servers)) mcpServers.push(...event.mcp_servers)
      if (Array.isArray(event.tools)) tools.push(...event.tools.filter((tool) => typeof tool === "string"))
    } catch {
      // Keep the raw stdout log; only structured lines contribute usage.
    }
  }

  const usage = resultEvent?.usage ?? aggregateModelUsage(resultEvent?.modelUsage)
  const inputTokens = numberValue(usage?.input_tokens ?? usage?.inputTokens)
  const outputTokens = numberValue(usage?.output_tokens ?? usage?.outputTokens)
  const cacheReadTokens = numberValue(usage?.cache_read_input_tokens ?? usage?.cacheReadInputTokens)
  const cacheWriteTokens = numberValue(usage?.cache_creation_input_tokens ?? usage?.cacheCreationInputTokens)
  return {
    inputTokens,
    outputTokens,
    cacheReadTokens,
    cacheWriteTokens,
    totalTokens: inputTokens + outputTokens + cacheReadTokens + cacheWriteTokens,
    estimatedCostUsd: numberValue(resultEvent?.total_cost_usd ?? resultEvent?.totalCostUsd),
    sessionIDs: [...sessionIDs],
    answer: typeof resultEvent?.result === "string" ? resultEvent.result : "",
    rawEventCount: events.length,
    resultEventFound: Boolean(resultEvent),
    isError: Boolean(resultEvent?.is_error),
    loadedPlugins: [...new Set(loadedPlugins)],
    pluginErrors,
    permissionDenials: Array.isArray(resultEvent?.permission_denials) ? resultEvent.permission_denials : [],
    mcpServers,
    tools: [...new Set(tools)],
    modelUsage: resultEvent?.modelUsage ?? {}
  }
}

export async function claudeCodeVersion(env, timeoutMs) {
  return runCommand("claude", ["--version"], { env, timeoutMs })
}

export async function lmStudioModelIDs(baseURL = DEFAULT_LMSTUDIO_BASE_URL, timeoutMs = 60_000) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const response = await fetch(`${baseURL.replace(/\/$/, "")}/v1/models`, { signal: controller.signal })
    if (!response.ok) return []
    const payload = await response.json()
    return Array.isArray(payload?.data) ? payload.data.map((model) => model?.id).filter(Boolean) : []
  } catch {
    return []
  } finally {
    clearTimeout(timer)
  }
}

export function formatLmStudioPreflightFailure(model, baseURL = DEFAULT_LMSTUDIO_BASE_URL) {
  return [
    `Claude Code benchmark model is not available from LM Studio: ${model}`,
    `Expected server: ${baseURL}`,
    "Start the LM Studio local server and load qwen/qwen3.5-9b, then retry."
  ].join("\n")
}

export async function tokenWardenClaudeReport(pluginDir, sessionID, cwd, env, timeoutMs) {
  if (!pluginDir || !sessionID) return { skipped: true, reason: "TokenWarden plugin or Claude session ID unavailable", stdout: "", stderr: "" }
  return runCommand("node", [join(pluginDir, "dist", "src", "cli.js"), "report", "--session", sessionID], { cwd, env, timeoutMs })
}

export async function installTokenWardenClaude(pluginDir, cwd, env, timeoutMs) {
  return runCommand("node", [join(pluginDir, "dist", "src", "cli.js"), "install", "--user"], { cwd, env, timeoutMs })
}

export async function readPackageVersion(packagePath) {
  const packageJson = JSON.parse(await readFile(join(packagePath, "package.json"), "utf8"))
  return { name: packageJson.name, version: packageJson.version }
}

export function formatAiRequestFailure(command, result, reason) {
  const status = result.signal ? `signal=${result.signal}` : `exit=${result.code}`
  const output = result.stderr || result.stdout
  return `${reason}: ${command}\n${status}${output ? `\n${result.stderr ? "stderr" : "stdout"}:\n${output}` : ""}`
}

function aiRequestError(command, result, reason) {
  const error = new Error(formatAiRequestFailure(command, result, reason))
  error.result = result
  return error
}

function aggregateModelUsage(modelUsage) {
  const total = {}
  for (const usage of Object.values(modelUsage ?? {})) {
    for (const key of ["input_tokens", "output_tokens", "cache_read_input_tokens", "cache_creation_input_tokens"]) {
      total[key] = numberValue(total[key]) + numberValue(usage?.[key])
    }
  }
  return total
}

function pluginName(plugin) {
  if (typeof plugin === "string") return plugin
  return plugin?.name ?? plugin?.id
}

function numberValue(value) {
  const parsed = typeof value === "number" ? value : typeof value === "string" ? Number(value) : 0
  return Number.isFinite(parsed) ? parsed : 0
}
