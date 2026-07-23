import { spawn } from "node:child_process"
import { readFile } from "node:fs/promises"
import { join, relative, resolve } from "node:path"
import { pathToFileURL } from "node:url"

export async function reportHtmlPath({ root, resultsRoot, platform, requestedResults }) {
  let directory
  if (requestedResults) {
    directory = resolve(root, requestedResults)
    assertGeneratedResultsDirectory(resultsRoot, directory)
  } else {
    const latest = JSON.parse(await readFile(join(resultsRoot, `latest-${platform}.json`), "utf8"))
    directory = resolve(root, latest.resultsRoot)
    assertGeneratedResultsDirectory(resultsRoot, directory)
  }
  return join(directory, "report.html")
}

export function openInDefaultBrowser(filePath, { platform = process.platform, spawnProcess = spawn } = {}) {
  const target = pathToFileURL(filePath).href
  const command = platform === "darwin" ? "open" : platform === "win32" ? "cmd" : "xdg-open"
  const args = platform === "win32" ? ["/c", "start", "", target] : [target]
  try {
    const child = spawnProcess(command, args, { detached: true, stdio: "ignore" })
    child.on("error", () => {})
    child.unref()
  } catch {
    // Report generation succeeded; a missing desktop launcher must not change its exit status.
  }
}

function assertGeneratedResultsDirectory(resultsRoot, directory) {
  const relativePath = relative(resultsRoot, directory)
  if (!relativePath || relativePath.startsWith("..") || relativePath.split(/[\\/]/).includes("..")) {
    throw new Error(`report results must be a generated directory under ${resultsRoot}`)
  }
}
