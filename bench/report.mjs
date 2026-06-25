#!/usr/bin/env node
import { spawn } from "node:child_process"
import { readFile, writeFile } from "node:fs/promises"
import { join, resolve } from "node:path"
import { pathToFileURL } from "node:url"
import { parseArgs } from "./lib/args.mjs"
import { createReportRows, renderAveragesCsv, renderHtml, renderMarkdown, renderTokensCsv } from "./lib/reporting.mjs"
import { repoRoot } from "./lib/workspace.mjs"

const args = parseArgs(process.argv.slice(2))
const root = repoRoot()
let resultsRoot = args.results ? resolve(String(args.results)) : undefined
if (!resultsRoot) {
  const latest = JSON.parse(await readFile(join(root, "bench", "results", "latest.json"), "utf8"))
  resultsRoot = latest.resultsRoot
}

const summaries = JSON.parse(await readFile(join(resultsRoot, "summary.json"), "utf8"))
const rows = createReportRows(summaries)
const report = renderMarkdown(rows, resultsRoot)
const htmlPath = join(resultsRoot, "report.html")
await writeFile(join(resultsRoot, "tokens.csv"), `${renderTokensCsv(rows)}\n`, "utf8")
await writeFile(join(resultsRoot, "averages.csv"), `${renderAveragesCsv(rows)}\n`, "utf8")
await writeFile(join(resultsRoot, "report.md"), report, "utf8")
await writeFile(htmlPath, renderHtml(rows, resultsRoot), "utf8")
if (!args.noOpen) openInDefaultBrowser(htmlPath)
process.stdout.write(`${report}\nHTML: ${htmlPath}\n`)

function openInDefaultBrowser(filePath) {
  const target = pathToFileURL(filePath).href
  const command = process.platform === "darwin" ? "open" : process.platform === "win32" ? "cmd" : "xdg-open"
  const commandArgs = process.platform === "win32" ? ["/c", "start", "", target] : [target]
  const child = spawn(command, commandArgs, { detached: true, stdio: "ignore" })
  child.on("error", () => {})
  child.unref()
}
