import test from "node:test"
import assert from "node:assert/strict"
import { loadSuite, renderPrompt, selectTasks } from "../lib/tasks.mjs"

test("future suite predeclares all planned benchmark tasks", async () => {
  const suite = await loadSuite("future.v1")
  assert.equal(suite.tasks.length, 14)
  assert.deepEqual(suite.tasks.map((task) => task.id), [
    "routing-read-write-ledger",
    "helper-read-write-ledger",
    "core-api-read-write-ledger",
    "react-state-bug-fix",
    "next-api-route-fix",
    "cli-flag-parsing-fix",
    "large-test-log-debug",
    "typecheck-flood-debug",
    "build-failure-debug",
    "multi-file-rename-migration",
    "feature-add-small",
    "refactor-no-behavior-change",
    "code-review-diagnosis",
    "docs-from-code"
  ])
})

test("tasks inherit suite repo and pinned commit metadata", async () => {
  const suite = await loadSuite("future.v1")
  const [task] = selectTasks(suite, ["react-state-bug-fix"])
  assert.equal(task.repo, suite.repo)
  assert.equal(task.defaultBranch, suite.defaultBranch)
  assert.equal(task.commit, suite.commit)
  assert.deepEqual(task.artifacts, [
    "bench-targets/react-state/src/useCartState.mjs",
    "bench-targets/react-state/src/CartPanel.jsx"
  ])
})

test("rendered prompts include benchmark task and repository", async () => {
  const suite = await loadSuite("future.v1")
  const [task] = selectTasks(suite, ["docs-from-code"])
  const prompt = renderPrompt(task, { repo: task.repo })
  assert.match(prompt, /Benchmark task: docs-from-code/)
  assert.match(prompt, /Repository: https:\/\/github\.com\/honojs\/hono\.git/)
})
