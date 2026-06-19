#!/usr/bin/env node
import { readFile, writeFile } from "node:fs/promises"
import { join, resolve } from "node:path"
import { parseArgs } from "./lib/args.mjs"
import { createReportRows, renderAveragesCsv, renderMarkdown, renderTokensCsv } from "./lib/reporting.mjs"
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
await writeFile(join(resultsRoot, "tokens.csv"), `${renderTokensCsv(rows)}\n`, "utf8")
await writeFile(join(resultsRoot, "averages.csv"), `${renderAveragesCsv(rows)}\n`, "utf8")
await writeFile(join(resultsRoot, "report.md"), report, "utf8")
process.stdout.write(report)
