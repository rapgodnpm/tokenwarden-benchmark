import test from "node:test"
import assert from "node:assert/strict"
import { hasMeasuredUsage, parseUsageFromJsonLines } from "../lib/usage.mjs"

test("usage parser captures provider token fields and session IDs", () => {
  const parsed = parseUsageFromJsonLines([
    JSON.stringify({ type: "session", sessionID: "ses_123" }),
    JSON.stringify({ type: "message", role: "assistant", text: "done", usage: { inputTokens: 100, outputTokens: 20, cacheReadTokens: 5, costUsd: 0.001 } })
  ].join("\n"))

  assert.equal(parsed.inputTokens, 100)
  assert.equal(parsed.outputTokens, 20)
  assert.equal(parsed.cacheReadTokens, 5)
  assert.equal(parsed.totalTokens, 125)
  assert.equal(parsed.estimatedCostUsd, 0.001)
  assert.deepEqual(parsed.sessionIDs, ["ses_123"])
  assert.match(parsed.answer, /done/)
})

test("usage parser captures opencode step token fields", () => {
  const parsed = parseUsageFromJsonLines([
    JSON.stringify({
      type: "sync",
      name: "session.next.step.ended.1",
      id: "evt_1",
      data: {
        sessionID: "ses_456",
        timestamp: 1,
        cost: 0.002,
        tokens: {
          input: 200,
          output: 40,
          cache: { read: 10, write: 5 }
        }
      }
    })
  ].join("\n"))

  assert.equal(parsed.inputTokens, 200)
  assert.equal(parsed.outputTokens, 40)
  assert.equal(parsed.cacheReadTokens, 10)
  assert.equal(parsed.cacheWriteTokens, 5)
  assert.equal(parsed.totalTokens, 255)
  assert.equal(parsed.estimatedCostUsd, 0.002)
  assert.deepEqual(parsed.sessionIDs, ["ses_456"])
})

test("usage parser prefers step totals over duplicate message updates", () => {
  const parsed = parseUsageFromJsonLines([
    JSON.stringify({
      type: "sync",
      name: "message.updated.1",
      id: "evt_message",
      data: {
        sessionID: "ses_789",
        info: {
          id: "msg_1",
          sessionID: "ses_789",
          role: "assistant",
          cost: 0.002,
          tokens: { input: 200, output: 40, cache: { read: 10, write: 5 } }
        }
      }
    }),
    JSON.stringify({
      type: "sync",
      name: "session.next.step.ended.1",
      id: "evt_step",
      data: {
        sessionID: "ses_789",
        timestamp: 1,
        cost: 0.002,
        tokens: { input: 200, output: 40, cache: { read: 10, write: 5 } }
      }
    })
  ].join("\n"))

  assert.equal(parsed.totalTokens, 255)
  assert.equal(parsed.estimatedCostUsd, 0.002)
})

test("measured usage requires a positive total token count", () => {
  assert.equal(hasMeasuredUsage({ totalTokens: 1 }), true)
  assert.equal(hasMeasuredUsage({ totalTokens: 0 }), false)
  assert.equal(hasMeasuredUsage(undefined), false)
})
