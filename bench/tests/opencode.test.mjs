import test from "node:test"
import assert from "node:assert/strict"
import { formatAiRequestFailure, formatModelPreflightFailure, formatOpenRouterAuthFailure, hasOpencodeModel, hasOpenRouterAuth, providerIDFromModel } from "../lib/opencode.mjs"

test("AI request failures include command status and model error output", () => {
  const message = formatAiRequestFailure("opencode run --model openrouter/z-ai/glm-5.2", {
    code: 1,
    signal: null,
    stdout: "",
    stderr: "OpenRouter error: invalid API key\n"
  }, "AI request failed")

  assert.match(message, /AI request failed: opencode run --model openrouter\/z-ai\/glm-5\.2/)
  assert.match(message, /exit=1/)
  assert.match(message, /stderr:\nOpenRouter error: invalid API key/)
})

test("OpenRouter auth preflight detects provider from auth list", () => {
  assert.equal(hasOpenRouterAuth({ stdout: "●  OpenRouter api\n", stderr: "" }), true)
  assert.equal(hasOpenRouterAuth({ stdout: "└  0 credentials\n", stderr: "" }), false)
})

test("OpenRouter auth failures explain isolated benchmark auth", () => {
  const message = formatOpenRouterAuthFailure({
    code: 0,
    signal: null,
    stdout: "└  0 credentials\n",
    stderr: ""
  }, {
    copied: false,
    source: "/home/me/.local/share/opencode/auth.json",
    destination: "/tmp/run/data/opencode/auth.json",
    reason: "source auth file not found"
  })

  assert.match(message, /OpenRouter auth not found in isolated benchmark workspace/)
  assert.match(message, /source auth file not found/)
  assert.match(message, /opencode auth login openrouter/)
})

test("model preflight detects exact opencode model IDs", () => {
  const result = { stdout: "openrouter/z-ai/glm-5.1\nopenrouter/z-ai/glm-5.2\n", stderr: "" }
  assert.equal(hasOpencodeModel(result, "openrouter/z-ai/glm-5.2"), true)
  assert.equal(hasOpencodeModel(result, "openrouter/z-ai/glm-5"), false)
  assert.equal(hasOpencodeModel({ stdout: "qwen/qwen3.5-9b\n", stderr: "" }, "lmstudio/qwen/qwen3.5-9b", ["qwen/qwen3.5-9b"]), true)
  assert.equal(providerIDFromModel("openrouter/z-ai/glm-5.2"), "openrouter")
  assert.equal(providerIDFromModel("lmstudio/qwen/qwen3.5-9b"), "lmstudio")
})

test("model preflight failures include provider output", () => {
  const message = formatModelPreflightFailure({
    code: 1,
    signal: null,
    stdout: "",
    stderr: "Provider not found: openrouter\n"
  }, "openrouter/z-ai/glm-5.2")

  assert.match(message, /Benchmark model is not available/)
  assert.match(message, /opencode models openrouter/)
  assert.match(message, /Provider not found: openrouter/)
})
