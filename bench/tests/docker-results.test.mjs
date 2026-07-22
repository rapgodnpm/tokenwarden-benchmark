import test from "node:test"
import assert from "node:assert/strict"
import { mkdir, mkdtemp, readFile, rm, symlink, writeFile } from "node:fs/promises"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { persistDockerResults } from "../../scripts/lib/docker-results.mjs"

test("Docker results are promoted into host-owned committable paths", async () => {
  const root = await mkdtemp(join(tmpdir(), "tokenwarden-docker-results-test-"))
  try {
    const stage = join(root, "stage")
    const destination = join(root, "repo", "bench", "results")
    const run = join(stage, "claude-code", "run-1")
    await mkdir(run, { recursive: true })
    await writeFile(join(run, "summary.json"), "[]\n", "utf8")
    await writeFile(join(stage, "latest-claude-code.json"), JSON.stringify({
      platform: "claude-code",
      runID: "run-1",
      resultsRoot: "bench/results/claude-code/run-1"
    }), "utf8")

    const messages = []
    const persisted = await persistDockerResults({
      stage,
      destination,
      repoRoot: join(root, "repo"),
      id: "test",
      platform: "claude-code",
      output: { write: (message) => messages.push(message) }
    })

    assert.deepEqual(persisted, [join(destination, "claude-code", "run-1")])
    assert.equal(await readFile(join(destination, "claude-code", "run-1", "summary.json"), "utf8"), "[]\n")
    assert.match(messages.join(""), /bench\/results\/claude-code\/run-1/)

    const duplicateStage = join(root, "duplicate")
    await mkdir(join(duplicateStage, "claude-code", "run-1"), { recursive: true })
    await writeFile(join(duplicateStage, "latest-claude-code.json"), JSON.stringify({
      platform: "claude-code",
      runID: "run-1",
      resultsRoot: "bench/results/claude-code/run-1"
    }), "utf8")
    await assert.rejects(
      persistDockerResults({ stage: duplicateStage, destination, repoRoot: join(root, "repo"), id: "duplicate", platform: "claude-code" }),
      /refusing to overwrite benchmark results/
    )
  } finally {
    await rm(root, { recursive: true, force: true })
  }
})

test("Docker result promotion rejects unsafe paths and symbolic links", async () => {
  const root = await mkdtemp(join(tmpdir(), "tokenwarden-docker-results-safety-test-"))
  try {
    const destination = join(root, "repo", "bench", "results")
    const unsafeStage = join(root, "unsafe")
    await mkdir(unsafeStage, { recursive: true })
    await writeFile(join(unsafeStage, "latest-opencode.json"), JSON.stringify({ resultsRoot: "/tmp/escape" }), "utf8")
    await assert.rejects(
      persistDockerResults({ stage: unsafeStage, destination, repoRoot: join(root, "repo"), id: "unsafe", platform: "opencode" }),
      /unsafe staged results path/
    )

    const forgedStage = join(root, "forged")
    await mkdir(forgedStage, { recursive: true })
    await writeFile(join(forgedStage, "latest-opencode.json"), JSON.stringify({
      platform: "opencode",
      runID: "run-1",
      resultsRoot: "bench/results/opencode/run-1"
    }), "utf8")
    await assert.rejects(
      persistDockerResults({ stage: forgedStage, destination, repoRoot: join(root, "repo"), id: "forged", platform: "claude-code" }),
      /unexpected platform pointer/
    )

    const redirectedStage = join(root, "redirected")
    await mkdir(join(redirectedStage, "opencode", "run-2"), { recursive: true })
    await writeFile(join(redirectedStage, "opencode", "run-2", "summary.json"), "[]\n", "utf8")
    await writeFile(join(redirectedStage, "latest-opencode.json"), JSON.stringify({
      platform: "opencode",
      runID: "run-2",
      resultsRoot: "bench/results/opencode/run-2"
    }), "utf8")
    await rm(destination, { recursive: true, force: true })
    await mkdir(join(root, "repo", "bench"), { recursive: true })
    await mkdir(join(root, "outside"), { recursive: true })
    await symlink(join(root, "outside"), destination)
    await assert.rejects(
      persistDockerResults({ stage: redirectedStage, destination, repoRoot: join(root, "repo"), id: "redirected", platform: "opencode" }),
      /destination path contains a symbolic link/
    )

    const linkedStage = join(root, "linked")
    await mkdir(linkedStage, { recursive: true })
    await symlink(unsafeStage, join(linkedStage, "escape"))
    await assert.rejects(
      persistDockerResults({ stage: linkedStage, destination, repoRoot: join(root, "repo"), id: "linked", platform: "opencode" }),
      /symbolic link/
    )
  } finally {
    await rm(root, { recursive: true, force: true })
  }
})
