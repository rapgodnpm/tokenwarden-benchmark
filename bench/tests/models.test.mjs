import test from "node:test"
import assert from "node:assert/strict"
import { BENCHMARK_MODELS, DEFAULT_BENCHMARK_MODEL, benchmarkModelAliases, resolveBenchmarkModel, selectBenchmarkModel } from "../lib/models.mjs"

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

test("benchmark model selector falls back to the default when non-interactive", async () => {
  assert.equal(await selectBenchmarkModel({ interactive: false }), DEFAULT_BENCHMARK_MODEL)
})
