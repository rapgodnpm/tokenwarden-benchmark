import test from "node:test"
import assert from "node:assert/strict"
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises"
import { tmpdir } from "node:os"
import { join, resolve } from "node:path"
import { createRunWorkspace, defaultOpencodeAuthPath, inheritOpencodeAuth, readPreparedState, resolveResultsRoot, workspaceEnv, writePreparedState } from "../lib/workspace.mjs"

test("results root defaults inside bench/results", () => {
  const root = resolve("/tmp/tokenwarden-project")
  assert.equal(resolveResultsRoot(root, undefined, "run-1"), resolve(root, "bench", "results", "run-1"))
})

test("results root rejects dangerous paths before deletion", () => {
  const root = resolve("/tmp/tokenwarden-project")
  for (const value of [".", "..", "bench/results", "/tmp", root]) {
    assert.throws(() => resolveResultsRoot(root, value, "run-1"), /unsafe benchmark results path/)
  }
})

test("results root accepts nested generated results paths", () => {
  const root = resolve("/tmp/tokenwarden-project")
  assert.equal(
    resolveResultsRoot(root, "bench/results/custom-run", "run-1"),
    resolve(root, "bench", "results", "custom-run")
  )
})

test("workspace PATH prefers isolated benchmark bins", () => {
  const env = workspaceEnv({
    home: "/tmp/home",
    configRoot: "/tmp/config",
    cache: "/tmp/cache",
    data: "/tmp/data",
    state: "/tmp/state",
    tokenwardenHome: "/tmp/tokenwarden",
    bin: "/tmp/run/bin",
    npmBin: "/tmp/run/xdg-config/opencode/node_modules/.bin"
  }, { PATH: "/usr/bin" })

  assert.equal(env.PATH, "/tmp/run/bin:/tmp/run/xdg-config/opencode/node_modules/.bin:/usr/bin")
})

test("opencode auth path defaults to XDG data home when present", () => {
  assert.equal(defaultOpencodeAuthPath({ XDG_DATA_HOME: "/tmp/data", HOME: "/tmp/home" }), "/tmp/data/opencode/auth.json")
})

test("benchmark workspaces inherit local opencode auth", async () => {
  const root = await mkdtemp(join(tmpdir(), "tokenwarden-workspace-test-"))
  try {
    const sourceData = join(root, "source-data")
    const workspaceData = join(root, "workspace-data")
    const source = join(sourceData, "opencode", "auth.json")
    await mkdir(join(sourceData, "opencode"), { recursive: true })
    await writeFile(source, "{\"openrouter\":{}}\n", "utf8")

    const result = await inheritOpencodeAuth({ data: workspaceData }, { XDG_DATA_HOME: sourceData })
    assert.equal(result.copied, true)
    assert.equal(await readFile(join(workspaceData, "opencode", "auth.json"), "utf8"), "{\"openrouter\":{}}\n")
  } finally {
    await rm(root, { recursive: true, force: true })
  }
})

test("prepared workspaces can be reused without deleting their contents", async () => {
  const root = await mkdtemp(join(tmpdir(), "tokenwarden-workspace-reuse-test-"))
  try {
    const workspace = await createRunWorkspace(root, { plugin: "tokenwarden", task: "task", run: 1 })
    const marker = join(workspace.root, "prepared.txt")
    await writeFile(marker, "ready\n", "utf8")
    await writePreparedState(workspace, { commit: "abc123", setup: [] })
    await createRunWorkspace(root, { plugin: "tokenwarden", task: "task", run: 1, reuse: true })
    assert.equal(await readFile(marker, "utf8"), "ready\n")
    assert.deepEqual(await readPreparedState(workspace), { commit: "abc123", setup: [] })
  } finally {
    await rm(root, { recursive: true, force: true })
  }
})
