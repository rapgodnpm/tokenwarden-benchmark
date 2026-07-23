import test from "node:test"
import assert from "node:assert/strict"
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { pathToFileURL } from "node:url"
import { openInDefaultBrowser, reportHtmlPath } from "../../scripts/lib/report-browser.mjs"

test("report HTML paths resolve from the latest pointer and explicit result directories", async () => {
  const root = await mkdtemp(join(tmpdir(), "tokenwarden-report-browser-test-"))
  const resultsRoot = join(root, "bench", "results")
  const directory = join(resultsRoot, "claude-code", "run-1")
  try {
    await mkdir(directory, { recursive: true })
    await writeFile(join(resultsRoot, "latest-claude-code.json"), JSON.stringify({
      platform: "claude-code",
      resultsRoot: "bench/results/claude-code/run-1"
    }), "utf8")

    assert.equal(
      await reportHtmlPath({ root, resultsRoot, platform: "claude-code" }),
      join(directory, "report.html")
    )
    assert.equal(
      await reportHtmlPath({ root, resultsRoot, platform: "claude-code", requestedResults: "bench/results/claude-code/run-1" }),
      join(directory, "report.html")
    )
  } finally {
    await rm(root, { recursive: true, force: true })
  }
})

test("browser launcher uses the host platform opener", () => {
  const launches = []
  openInDefaultBrowser("/tmp/report.html", {
    platform: "darwin",
    spawnProcess(command, args, options) {
      launches.push({ command, args, options })
      return { on() {}, unref() {} }
    }
  })

  assert.deepEqual(launches, [{
    command: "open",
    args: [pathToFileURL("/tmp/report.html").href],
    options: { detached: true, stdio: "ignore" }
  }])
})
