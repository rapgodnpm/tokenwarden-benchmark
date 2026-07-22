import { createServer } from "node:http"
import test from "node:test"
import assert from "node:assert/strict"
import { createClaudeCodeEnv, createClaudeCodeSettings, createTokenWardenMcpConfig, formatAiRequestFailure, formatLmStudioPreflightFailure, lmStudioModelIDs, parseClaudeCodeJsonLines } from "../lib/claude-code.mjs"

test("Claude Code JSONL parser captures usage, answer, session, and plugins", () => {
  const output = [
    JSON.stringify({ type: "system", subtype: "init", session_id: "session-1", plugins: [{ name: "tokenwarden" }] }),
    JSON.stringify({ type: "assistant", session_id: "session-1", message: { content: [] } }),
    JSON.stringify({
      type: "result",
      subtype: "success",
      session_id: "session-1",
      is_error: false,
      result: "Task complete.",
      total_cost_usd: 0.012,
      usage: {
        input_tokens: 100,
        output_tokens: 20,
        cache_read_input_tokens: 30,
        cache_creation_input_tokens: 10
      }
    })
  ].join("\n")

  assert.deepEqual(parseClaudeCodeJsonLines(output), {
    inputTokens: 100,
    outputTokens: 20,
    cacheReadTokens: 30,
    cacheWriteTokens: 10,
    totalTokens: 160,
    estimatedCostUsd: 0.012,
    sessionIDs: ["session-1"],
    answer: "Task complete.",
    rawEventCount: 3,
    resultEventFound: true,
    isError: false,
    loadedPlugins: ["tokenwarden"],
    pluginErrors: [],
    permissionDenials: [],
    mcpServers: [],
    tools: [],
    modelUsage: {}
  })
})

test("Claude Code JSONL parser captures MCP availability and permission denials", () => {
  const output = [
    JSON.stringify({
      type: "system",
      subtype: "init",
      tools: ["Read", "mcp__tokenwarden__smart_read"],
      mcp_servers: [{ name: "tokenwarden", status: "connected" }]
    }),
    JSON.stringify({
      type: "result",
      result: "",
      permission_denials: [{ tool_name: "Bash" }],
      usage: {}
    })
  ].join("\n")

  const usage = parseClaudeCodeJsonLines(output)
  assert.deepEqual(usage.mcpServers, [{ name: "tokenwarden", status: "connected" }])
  assert.deepEqual(usage.tools, ["Read", "mcp__tokenwarden__smart_read"])
  assert.deepEqual(usage.permissionDenials, [{ tool_name: "Bash" }])
})

test("Claude Code JSONL parser records plugin load errors", () => {
  const usage = parseClaudeCodeJsonLines(JSON.stringify({
    type: "result",
    session_id: "session-2",
    result: "",
    plugin_errors: [{ plugin: "broken", message: "invalid manifest" }],
    usage: {}
  }))

  assert.deepEqual(usage.pluginErrors, [{ plugin: "broken", message: "invalid manifest" }])
})

test("Claude Code environment isolates config and routes requests to LM Studio", () => {
  const env = createClaudeCodeEnv({
    home: "/tmp/home",
    claudeConfigDir: "/tmp/home/.claude",
    tokenwardenHome: "/tmp/tokenwarden"
  }, {
    PATH: "/usr/bin",
    ANTHROPIC_API_KEY: "must-not-leak",
    LM_API_TOKEN: "local-key"
  })

  assert.equal(env.HOME, "/tmp/home")
  assert.equal(env.CLAUDE_CONFIG_DIR, "/tmp/home/.claude")
  assert.equal(env.ANTHROPIC_BASE_URL, "http://localhost:1234")
  assert.equal(env.ANTHROPIC_AUTH_TOKEN, "local-key")
  assert.equal(env.ANTHROPIC_API_KEY, undefined)
  assert.equal(env.CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC, "1")
  assert.deepEqual(createClaudeCodeSettings(), { permissions: { defaultMode: "bypassPermissions" } })
  assert.deepEqual(createTokenWardenMcpConfig("/tmp/plugin"), {
    mcpServers: {
      tokenwarden: {
        command: "node",
        args: ["/tmp/plugin/dist/src/mcp-server.js"]
      }
    }
  })
})

test("Claude Code failures and LM Studio preflight errors are actionable", () => {
  const message = formatAiRequestFailure("claude -p task", {
    code: 1,
    signal: null,
    stdout: "",
    stderr: "model not found\n"
  }, "AI request failed")
  assert.match(message, /AI request failed: claude -p task/)
  assert.match(message, /exit=1/)
  assert.match(message, /model not found/)
  assert.match(formatLmStudioPreflightFailure("qwen\/qwen3.5-9b"), /Start the LM Studio local server/)
})

test("LM Studio preflight returns models and preserves HTTP failures", async (t) => {
  let status = 200
  const server = createServer((_request, response) => {
    response.writeHead(status, { "content-type": "application/json" })
    response.end(status === 200
      ? JSON.stringify({ data: [{ id: "qwen/qwen3.5-9b" }] })
      : JSON.stringify({ error: "unavailable" }))
  })
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve))
  t.after(() => new Promise((resolve) => server.close(resolve)))
  const address = server.address()
  const baseURL = `http://127.0.0.1:${address.port}`

  assert.deepEqual(await lmStudioModelIDs(baseURL), ["qwen/qwen3.5-9b"])
  status = 503
  await assert.rejects(() => lmStudioModelIDs(baseURL), /HTTP 503 Service Unavailable/)
})
