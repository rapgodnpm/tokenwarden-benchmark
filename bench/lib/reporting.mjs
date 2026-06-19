import { join } from "node:path"

export const INPUT_TOKEN_PRICE_PER_MILLION_USD = 5
export const OUTPUT_TOKEN_PRICE_PER_MILLION_USD = 25

export function createReportRows(summaries) {
  const rows = summaries.map((summary) => {
    const inputTokens = summary.usage.inputTokens ?? 0
    const outputTokens = summary.usage.outputTokens ?? 0
    const inputCostUsd = tokenCost(inputTokens, INPUT_TOKEN_PRICE_PER_MILLION_USD)
    const outputCostUsd = tokenCost(outputTokens, OUTPUT_TOKEN_PRICE_PER_MILLION_USD)
    return {
      plugin: summary.plugin,
      task: summary.task,
      run: summary.run,
      dryRun: summary.dryRun,
      prepareOnly: summary.prepareOnly,
      inputTokens,
      outputTokens,
      cacheReadTokens: summary.usage.cacheReadTokens ?? 0,
      cacheWriteTokens: summary.usage.cacheWriteTokens ?? 0,
      totalTokens: summary.usage.totalTokens ?? 0,
      estimatedCostUsd: summary.usage.estimatedCostUsd ?? 0,
      inputCostUsd,
      outputCostUsd,
      calculatedCostUsd: inputCostUsd + outputCostUsd
    }
  })

  const baselineTokens = new Map(rows.filter((row) => row.plugin === "baseline").map((row) => [`${row.task}:${row.run}`, row.totalTokens]))
  const baselineCosts = new Map(rows.filter((row) => row.plugin === "baseline").map((row) => [`${row.task}:${row.run}`, row.calculatedCostUsd]))
  for (const row of rows) {
    const key = `${row.task}:${row.run}`
    const baselineTotalTokens = baselineTokens.get(key) ?? 0
    const baselineCalculatedCost = baselineCosts.get(key) ?? 0
    row.savedVsBaseline = row.plugin === "baseline" ? 0 : baselineTotalTokens - row.totalTokens
    row.savedPercent = baselineTotalTokens > 0 ? (row.savedVsBaseline / baselineTotalTokens) * 100 : 0
    row.savedCostVsBaseline = row.plugin === "baseline" ? 0 : baselineCalculatedCost - row.calculatedCostUsd
    row.savedCostPercent = baselineCalculatedCost > 0 ? (row.savedCostVsBaseline / baselineCalculatedCost) * 100 : 0
  }

  return rows
}

export function renderTokensCsv(rows) {
  return [
    "plugin,task,run,dry_run,prepare_only,input_tokens,output_tokens,cache_read_tokens,cache_write_tokens,total_tokens,provider_estimated_cost_usd,input_cost_usd,output_cost_usd,calculated_cost_usd,saved_vs_baseline,saved_percent,saved_cost_vs_baseline,saved_cost_percent",
    ...rows.map((row) => [
      row.plugin,
      row.task,
      row.run,
      row.dryRun,
      row.prepareOnly,
      row.inputTokens,
      row.outputTokens,
      row.cacheReadTokens,
      row.cacheWriteTokens,
      row.totalTokens,
      row.estimatedCostUsd,
      formatCsvNumber(row.inputCostUsd),
      formatCsvNumber(row.outputCostUsd),
      formatCsvNumber(row.calculatedCostUsd),
      row.savedVsBaseline,
      row.savedPercent.toFixed(2),
      formatCsvNumber(row.savedCostVsBaseline),
      row.savedCostPercent.toFixed(2)
    ].join(","))
  ].join("\n")
}

export function renderAveragesCsv(rows) {
  return [
    "task,plugin,runs,average_input_tokens,average_output_tokens,average_cache_read_tokens,average_cache_write_tokens,average_total_tokens,average_provider_estimated_cost_usd,average_input_cost_usd,average_output_cost_usd,average_calculated_cost_usd,average_saved_vs_baseline,average_saved_percent,average_saved_cost_vs_baseline,average_saved_cost_percent",
    ...summariesByTaskAndPlugin(rows).map((summary) => [
      summary.task,
      summary.plugin,
      summary.runs,
      summary.averageInputTokens.toFixed(2),
      summary.averageOutputTokens.toFixed(2),
      summary.averageCacheReadTokens.toFixed(2),
      summary.averageCacheWriteTokens.toFixed(2),
      summary.averageTotalTokens.toFixed(2),
      formatCsvNumber(summary.averageEstimatedCostUsd),
      formatCsvNumber(summary.averageInputCostUsd),
      formatCsvNumber(summary.averageOutputCostUsd),
      formatCsvNumber(summary.averageCalculatedCostUsd),
      summary.averageSavedVsBaseline.toFixed(2),
      summary.averageSavedPercent.toFixed(2),
      formatCsvNumber(summary.averageSavedCostVsBaseline),
      summary.averageSavedCostPercent.toFixed(2)
    ].join(","))
  ].join("\n")
}

export function renderMarkdown(rows, resultsRoot) {
  const lines = [
    "# TokenWarden Benchmark Report",
    "",
    `Results: \`${resultsRoot}\``,
    "",
    `Calculated costs use $${INPUT_TOKEN_PRICE_PER_MILLION_USD}/1M input tokens and $${OUTPUT_TOKEN_PRICE_PER_MILLION_USD}/1M output tokens.`,
    "",
    "## Overall",
    "",
    "| Plugin | Runs | Median Total Tokens | Average Total Tokens | Median Saved Tokens | Average Saved Tokens | Median Calculated Cost | Average Calculated Cost | Median Saved Cost | Average Saved Cost |",
    "| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |"
  ]

  for (const summary of summariesByPlugin(rows)) {
    lines.push(`| ${summary.plugin} | ${summary.runs} | ${formatToken(summary.medianTotalTokens)} | ${formatToken(summary.averageTotalTokens)} | ${formatToken(summary.medianSavedVsBaseline)} | ${formatToken(summary.averageSavedVsBaseline)} | ${formatMoney(summary.medianCalculatedCostUsd)} | ${formatMoney(summary.averageCalculatedCostUsd)} | ${formatMoney(summary.medianSavedCostVsBaseline)} | ${formatMoney(summary.averageSavedCostVsBaseline)} |`)
  }

  lines.push(
    "",
    "## By Task",
    "",
    "| Task | Plugin | Runs | Median Total Tokens | Average Total Tokens | Median Saved % | Average Saved % | Median Cost | Average Cost |",
    "| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |"
  )

  for (const summary of summariesByTaskAndPlugin(rows)) {
    lines.push(`| ${summary.task} | ${summary.plugin} | ${summary.runs} | ${formatToken(summary.medianTotalTokens)} | ${formatToken(summary.averageTotalTokens)} | ${formatPercent(summary.medianSavedPercent)} | ${formatPercent(summary.averageSavedPercent)} | ${formatMoney(summary.medianCalculatedCostUsd)} | ${formatMoney(summary.averageCalculatedCostUsd)} |`)
  }

  lines.push("", `CSV: \`${join(resultsRoot, "tokens.csv")}\``, `Averages CSV: \`${join(resultsRoot, "averages.csv")}\``, "")
  return lines.join("\n")
}

export function summariesByPlugin(rows) {
  return [...groupRows(rows, (row) => row.plugin).entries()].map(([plugin, group]) => summarizeRows(group, { plugin }))
}

export function summariesByTaskAndPlugin(rows) {
  return [...groupRows(rows, (row) => `${row.task}\0${row.plugin}`).entries()].map(([, group]) => summarizeRows(group, { task: group[0]?.task ?? "", plugin: group[0]?.plugin ?? "" }))
}

export function average(values) {
  return values.length ? values.reduce((total, value) => total + value, 0) / values.length : 0
}

export function median(values) {
  if (!values.length) return 0
  const sorted = [...values].sort((a, b) => a - b)
  const middle = Math.floor(sorted.length / 2)
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2
}

function summarizeRows(rows, labels) {
  return {
    ...labels,
    runs: rows.length,
    medianTotalTokens: median(rows.map((row) => row.totalTokens)),
    averageTotalTokens: average(rows.map((row) => row.totalTokens)),
    medianSavedVsBaseline: median(rows.map((row) => row.savedVsBaseline)),
    averageSavedVsBaseline: average(rows.map((row) => row.savedVsBaseline)),
    medianSavedPercent: median(rows.map((row) => row.savedPercent)),
    averageSavedPercent: average(rows.map((row) => row.savedPercent)),
    averageInputTokens: average(rows.map((row) => row.inputTokens)),
    averageOutputTokens: average(rows.map((row) => row.outputTokens)),
    averageCacheReadTokens: average(rows.map((row) => row.cacheReadTokens)),
    averageCacheWriteTokens: average(rows.map((row) => row.cacheWriteTokens)),
    averageEstimatedCostUsd: average(rows.map((row) => row.estimatedCostUsd)),
    averageInputCostUsd: average(rows.map((row) => row.inputCostUsd)),
    averageOutputCostUsd: average(rows.map((row) => row.outputCostUsd)),
    medianCalculatedCostUsd: median(rows.map((row) => row.calculatedCostUsd)),
    averageCalculatedCostUsd: average(rows.map((row) => row.calculatedCostUsd)),
    medianSavedCostVsBaseline: median(rows.map((row) => row.savedCostVsBaseline)),
    averageSavedCostVsBaseline: average(rows.map((row) => row.savedCostVsBaseline)),
    averageSavedCostPercent: average(rows.map((row) => row.savedCostPercent))
  }
}

function groupRows(rows, keyForRow) {
  const groups = new Map()
  for (const row of rows) {
    const key = keyForRow(row)
    const group = groups.get(key) ?? []
    group.push(row)
    groups.set(key, group)
  }
  return groups
}

function tokenCost(tokens, pricePerMillion) {
  return (tokens / 1_000_000) * pricePerMillion
}

function formatCsvNumber(value) {
  return Number(value).toFixed(8)
}

function formatToken(value) {
  return Number(value).toFixed(0)
}

function formatMoney(value) {
  return `$${Number(value).toFixed(4)}`
}

function formatPercent(value) {
  return `${Number(value).toFixed(2)}%`
}
