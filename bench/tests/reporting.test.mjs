import test from "node:test"
import assert from "node:assert/strict"
import { createReportRows, renderAveragesCsv, renderHtml, renderMarkdown, renderTokensCsv } from "../lib/reporting.mjs"

test("report rows calculate fixed input and output token costs", () => {
  const rows = createReportRows([
    summary("baseline", "task-a", 1, { inputTokens: 1_000_000, outputTokens: 100_000, totalTokens: 1_100_000 }),
    summary("tokenwarden", "task-a", 1, { inputTokens: 500_000, outputTokens: 50_000, totalTokens: 550_000 })
  ])

  assert.equal(rows[0].inputCostUsd, 5)
  assert.equal(rows[0].outputCostUsd, 2.5)
  assert.equal(rows[0].calculatedCostUsd, 7.5)
  assert.equal(rows[1].calculatedCostUsd, 3.75)
  assert.equal(rows[1].savedCostVsBaseline, 3.75)
  assert.equal(rows[1].savedCostPercent, 50)
})

test("markdown report includes median and average token metrics", () => {
  const rows = createReportRows([
    summary("baseline", "task-a", 1, { inputTokens: 100, outputTokens: 10, totalTokens: 110 }),
    summary("baseline", "task-a", 2, { inputTokens: 200, outputTokens: 20, totalTokens: 220 }),
    summary("baseline", "task-a", 3, { inputTokens: 300, outputTokens: 30, totalTokens: 330 }),
    summary("tokenwarden", "task-a", 1, { inputTokens: 50, outputTokens: 5, totalTokens: 55 }),
    summary("tokenwarden", "task-a", 2, { inputTokens: 100, outputTokens: 10, totalTokens: 110 }),
    summary("tokenwarden", "task-a", 3, { inputTokens: 150, outputTokens: 15, totalTokens: 165 })
  ])
  const markdown = renderMarkdown(rows, "/tmp/results")

  assert.match(markdown, /Median Total Tokens \| Average Total Tokens \| P25 Total \| P75 Total/)
  assert.doesNotMatch(markdown, /Pass Rate/)
  assert.match(markdown, /\| tokenwarden \| 3 \| 0 \| 0 \| 110 \| 110 \| 83 \| 138 \| 55 \| 165 \| 1000ms \| 110 \| 110 \| \$0\.0008 \| \$0\.0008 \| \$0\.0008 \| \$0\.0008 \|/)
  assert.match(markdown, /## By Task/)
  assert.match(markdown, /## Best By Task/)
})

test("html report includes benchmark tables", () => {
  const rows = createReportRows([
    summary("baseline", "task-a", 1, { inputTokens: 1_000_000, outputTokens: 100_000, totalTokens: 1_100_000 }),
    summary("tokenwarden", "task-a", 1, { inputTokens: 500_000, outputTokens: 50_000, totalTokens: 550_000 }),
    summary("openslimedit", "task-a", 1, { inputTokens: 250_000, outputTokens: 25_000, totalTokens: 275_000 })
  ])
  const html = renderHtml(rows, "/tmp/results")

  assert.match(html, /<!doctype html>/)
  assert.match(html, /<h2>Overall<\/h2>/)
  assert.match(html, /<h2>By Task<\/h2>/)
  assert.match(html, /<h2>Best By Task<\/h2>/)
  assert.match(html, /Overall Money Saved Ranking/)
  assert.match(html, /openslimedit<\/strong> saved the most money overall: <strong>\$5\.6250<\/strong> \(75\.00%\)/)
})

test("CSV outputs include calculated cost and task averages", () => {
  const rows = createReportRows([
    summary("baseline", "task-a", 1, { inputTokens: 1_000_000, outputTokens: 100_000, totalTokens: 1_100_000 }),
    summary("tokenwarden", "task-a", 1, { inputTokens: 500_000, outputTokens: 50_000, totalTokens: 550_000 })
  ])

  assert.match(renderTokensCsv(rows), /^platform,plugin,task,run/)
  assert.match(renderTokensCsv(rows), /failed,timed_out,duration_ms,input_tokens/)
  assert.match(renderTokensCsv(rows), /input_cost_usd,output_cost_usd,calculated_cost_usd/)
  assert.doesNotMatch(renderTokensCsv(rows).split("\n")[0], /passed/)
  assert.match(renderTokensCsv(rows), /5\.00000000,2\.50000000,7\.50000000/)
  assert.match(renderAveragesCsv(rows), /^platform,task,plugin,runs/)
  assert.match(renderAveragesCsv(rows), /failed_runs,timeout_count,median_duration_ms/)
  assert.match(renderAveragesCsv(rows), /average_input_cost_usd,average_output_cost_usd,median_calculated_cost_usd,average_calculated_cost_usd/)
  assert.doesNotMatch(renderAveragesCsv(rows).split("\n")[0], /pass_rate/)
  assert.match(renderAveragesCsv(rows), /task-a,tokenwarden,1,0,0,1000,500000\.00,50000\.00,0\.00,0\.00,550000\.00,550000\.00/)
})

test("baseline savings are isolated by platform", () => {
  const rows = createReportRows([
    { ...summary("baseline", "task-a", 1, { inputTokens: 100, outputTokens: 0, totalTokens: 100 }), platform: "opencode" },
    { ...summary("plugin", "task-a", 1, { inputTokens: 50, outputTokens: 0, totalTokens: 50 }), platform: "opencode" },
    { ...summary("baseline", "task-a", 1, { inputTokens: 200, outputTokens: 0, totalTokens: 200 }), platform: "claude-code" },
    { ...summary("plugin", "task-a", 1, { inputTokens: 150, outputTokens: 0, totalTokens: 150 }), platform: "claude-code" }
  ])

  assert.equal(rows.find((row) => row.platform === "opencode" && row.plugin === "plugin").savedPercent, 50)
  assert.equal(rows.find((row) => row.platform === "claude-code" && row.plugin === "plugin").savedPercent, 25)
})

function summary(plugin, task, run, usage) {
  return {
    plugin,
    task,
    run,
    dryRun: false,
    prepareOnly: false,
    durationMs: 1000,
    usage,
    verification: { passed: true }
  }
}
