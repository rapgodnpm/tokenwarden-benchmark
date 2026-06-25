import test from "node:test"
import assert from "node:assert/strict"
import { runVerifyCommands } from "../lib/verify.mjs"

test("verify commands time out instead of hanging", async () => {
  const result = await runVerifyCommands([`${process.execPath} -e "setTimeout(() => {}, 1000)"`], process.cwd(), process.env, { timeoutMs: 20 })

  assert.equal(result.passed, false)
  assert.equal(result.results.length, 1)
  assert.equal(result.results[0].timedOut, true)
})

test("verify command timeout overrides runner default", async () => {
  const result = await runVerifyCommands([{ command: `${process.execPath} -e "setTimeout(() => {}, 1000)"`, timeoutMs: 20 }], process.cwd(), process.env, { timeoutMs: 1000 })

  assert.equal(result.passed, false)
  assert.equal(result.results[0].timedOut, true)
})
