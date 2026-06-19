import test from "node:test"
import assert from "node:assert/strict"
import { loadAdapter, validateAdapter } from "../lib/adapters.mjs"

test("all benchmark adapters enable zero or one plugin", async () => {
  for (const id of ["baseline", "tokenwarden", "openslimedit", "dcp", "openrtk"]) {
    const adapter = await loadAdapter(id)
    assert.ok(adapter.plugins.length <= 1, `${id} enables too many plugins`)
  }
})

test("adapter validation rejects plugin stacks", () => {
  assert.throws(
    () => validateAdapter({ id: "bad", plugins: ["one", "two"] }),
    /at most one plugin/
  )
})
