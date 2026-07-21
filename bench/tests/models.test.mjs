import test from "node:test"
import assert from "node:assert/strict"
import { Readable, Writable } from "node:stream"
import { BENCHMARK_MODELS, DEFAULT_BENCHMARK_MODEL, DEFAULT_CLAUDE_CODE_MODEL, benchmarkModelAliases, resolveBenchmarkModel, selectBenchmarkModel } from "../lib/models.mjs"

test("benchmark model registry includes OpenRouter and LM Studio choices", () => {
  assert.deepEqual(BENCHMARK_MODELS.map((model) => model.model), [
    "openrouter/z-ai/glm-5.2",
    "openrouter/qwen/qwen3.7-max",
    "lmstudio/qwen/qwen3.5-9b"
  ])
})

test("benchmark model resolver accepts keys and display model IDs", () => {
  assert.equal(resolveBenchmarkModel("openrouter-qwen3.7-max"), "openrouter/qwen/qwen3.7-max")
  assert.equal(resolveBenchmarkModel("qwen/qwen3.5-9b"), "lmstudio/qwen/qwen3.5-9b")
  assert.equal(resolveBenchmarkModel("custom/provider-model"), "custom/provider-model")
})

test("benchmark model aliases include LM Studio display ID", () => {
  assert.deepEqual(benchmarkModelAliases("lmstudio/qwen/qwen3.5-9b"), [
    "lmstudio/qwen/qwen3.5-9b",
    "qwen/qwen3.5-9b",
    "lmstudio-qwen3.5-9b"
  ])
})

test("Claude Code uses the LM Studio Qwen model ID", async () => {
  assert.equal(DEFAULT_CLAUDE_CODE_MODEL, "qwen/qwen3.5-9b")
  assert.equal(resolveBenchmarkModel("lmstudio-qwen3.5-9b", "claude-code"), "qwen/qwen3.5-9b")
  assert.deepEqual(benchmarkModelAliases("qwen/qwen3.5-9b", "claude-code"), [
    "qwen/qwen3.5-9b",
    "lmstudio-qwen3.5-9b"
  ])
  assert.equal(await selectBenchmarkModel({ interactive: false, platform: "claude-code" }), "qwen/qwen3.5-9b")
})

test("benchmark model selector falls back to the default when non-interactive", async () => {
  assert.equal(await selectBenchmarkModel({ interactive: false }), DEFAULT_BENCHMARK_MODEL)
})

test("benchmark model selector can delegate to OpenCode model selection", async () => {
  const input = Readable.from(["0\n"])
  const output = new Writable({ write(_chunk, _encoding, callback) { callback() } })

  assert.equal(await selectBenchmarkModel({
    interactive: true,
    input,
    output,
    selectFromOpencodeModels: async () => "lmstudio/qwen/qwen3-30b-a3b-2507"
  }), "lmstudio/qwen/qwen3-30b-a3b-2507")
})
