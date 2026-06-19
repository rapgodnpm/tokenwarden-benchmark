import test from "node:test"
import assert from "node:assert/strict"
import { createReportRows, renderAveragesCsv, renderMarkdown, renderTokensCsv } from "../lib/reporting.mjs"

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

  assert.match(markdown, /Median Total Tokens \| Average Total Tokens/)
  assert.doesNotMatch(markdown, /Pass Rate|Failed Runs/)
  assert.match(markdown, /\| tokenwarden \| 3 \| 110 \| 110 \| 110 \| 110 \| \$0\.0008 \| \$0\.0008 \| \$0\.0008 \| \$0\.0008 \|/)
  assert.match(markdown, /## By Task/)
})

test("CSV outputs include calculated cost and task averages", () => {
  const rows = createReportRows([
    summary("baseline", "task-a", 1, { inputTokens: 1_000_000, outputTokens: 100_000, totalTokens: 1_100_000 }),
    summary("tokenwarden", "task-a", 1, { inputTokens: 500_000, outputTokens: 50_000, totalTokens: 550_000 })
  ])

  assert.match(renderTokensCsv(rows), /input_cost_usd,output_cost_usd,calculated_cost_usd/)
  assert.doesNotMatch(renderTokensCsv(rows).split("\n")[0], /passed/)
  assert.match(renderTokensCsv(rows), /5\.00000000,2\.50000000,7\.50000000/)
  assert.match(renderAveragesCsv(rows), /average_input_cost_usd,average_output_cost_usd,average_calculated_cost_usd/)
  assert.doesNotMatch(renderAveragesCsv(rows).split("\n")[0], /pass_rate/)
  assert.match(renderAveragesCsv(rows), /task-a,tokenwarden,1,500000\.00,50000\.00,0\.00,0\.00,550000\.00,0\.00000000,2\.50000000,1\.25000000,3\.75000000,550000\.00,50\.00,3\.75000000,50\.00/)
})

function summary(plugin, task, run, usage) {
  return {
    plugin,
    task,
    run,
    dryRun: false,
    prepareOnly: false,
    usage,
    verification: { passed: true }
  }
}
