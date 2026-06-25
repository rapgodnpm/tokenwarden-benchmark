import test from "node:test"
import assert from "node:assert/strict"
import { BENCHMARK_PERMISSION, configuredProviderModelIDs, createOpenCodeConfig, DEFAULT_AI_TIMEOUT_MS, DEFAULT_BENCHMARK_MODEL, DEFAULT_BENCHMARK_RUNS, providerPackages } from "../lib/config.mjs"

test("generated opencode config uses OpenRouter GLM benchmark model", () => {
  const config = createOpenCodeConfig({ id: "tokenwarden", plugins: ["@tokenwarden/opencode"] })
  assert.equal(config.model, DEFAULT_BENCHMARK_MODEL)
  assert.equal(config.small_model, DEFAULT_BENCHMARK_MODEL)
  assert.equal(config.provider, undefined)
  assert.deepEqual(config.plugin, ["@tokenwarden/opencode"])
  assert.deepEqual(config.permission, BENCHMARK_PERMISSION)
})

test("baseline config enables no plugins", () => {
  const config = createOpenCodeConfig({ id: "baseline", plugins: [] })
  assert.deepEqual(config.plugin, [])
})

test("generated opencode config preserves inherited providers only", () => {
  const provider = {
    "lmstudio-local": {
      npm: "@ai-sdk/openai-compatible",
      models: { "qwen/qwen3.6-27b": { name: "qwen/qwen3.6-27b" } }
    }
  }
  const config = createOpenCodeConfig({ id: "baseline", plugins: [] }, { provider })

  assert.deepEqual(config.provider, provider)
  assert.deepEqual(providerPackages(provider, "lmstudio-local"), ["@ai-sdk/openai-compatible"])
  assert.deepEqual(configuredProviderModelIDs(provider), ["lmstudio-local/qwen/qwen3.6-27b"])
})

test("benchmark defaults to three runs per task and plugin", () => {
  assert.equal(DEFAULT_BENCHMARK_RUNS, 3)
})

test("benchmark runs deny interactive permissions by default", () => {
  const config = createOpenCodeConfig({ id: "openrtk", plugins: ["openrtk"] })
  assert.equal(config.permission.question, "deny")
  assert.equal(config.permission.task, "deny")
  assert.equal(config.permission.external_directory, "deny")
  assert.equal(config.permission.bash, "allow")
  assert.equal(DEFAULT_AI_TIMEOUT_MS, 1_800_000)
})
