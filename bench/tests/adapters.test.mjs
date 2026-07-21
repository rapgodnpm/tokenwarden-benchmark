import test from "node:test"
import assert from "node:assert/strict"
import { loadAdapter, validateAdapter } from "../lib/adapters.mjs"

test("all benchmark adapters enable zero or one plugin", async () => {
  for (const id of ["baseline", "tokenwarden", "openslimedit", "dcp", "openrtk"]) {
    const adapter = await loadAdapter(id)
    assert.ok(adapter.plugins.length <= 1, `${id} enables too many plugins`)
  }
})

test("Claude Code adapters use independent supported integrations", async () => {
  const expected = new Map([
    ["baseline", "none"],
    ["tokenwarden", "local-plugin"],
    ["context-mode", "npm-plugin"],
    ["rtk", "rtk-hook"],
    ["caveman", "git-plugin"]
  ])
  for (const [id, integration] of expected) {
    const adapter = await loadAdapter(id, "claude-code")
    assert.equal(adapter.integration, integration)
  }
})

test("adapter validation rejects plugin stacks", () => {
  assert.throws(
    () => validateAdapter({ id: "bad", plugins: ["one", "two"] }),
    /at most one plugin/
  )
})

test("Claude Code adapter validation rejects unknown integrations", () => {
  assert.throws(
    () => validateAdapter({ id: "bad", integration: "unknown" }, "claude-code"),
    /unsupported Claude Code integration/
  )
})
