import test from "node:test"
import assert from "node:assert/strict"
import { DEFAULT_BENCHMARK_SUITE } from "../lib/runner-options.mjs"

test("benchmark runner defaults to the full future suite", () => {
  assert.equal(DEFAULT_BENCHMARK_SUITE, "future.v1")
})
