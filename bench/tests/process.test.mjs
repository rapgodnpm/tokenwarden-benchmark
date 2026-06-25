import test from "node:test"
import assert from "node:assert/strict"
import { runCommand } from "../lib/process.mjs"

test("runCommand records timeout status and duration", async () => {
  const result = await runCommand(process.execPath, ["-e", "setTimeout(() => {}, 1000)"], { timeoutMs: 10 })
  assert.equal(result.timedOut, true)
  assert.ok(result.durationMs >= 0)
})
