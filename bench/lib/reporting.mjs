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
      calculatedCostUsd: inputCostUsd + outputCostUsd,
      failed: Boolean(summary.failed),
      timedOut: Boolean(summary.timedOut),
      durationMs: summary.durationMs ?? summary.opencode?.durationMs ?? 0
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
    "plugin,task,run,dry_run,prepare_only,failed,timed_out,duration_ms,input_tokens,output_tokens,cache_read_tokens,cache_write_tokens,total_tokens,provider_estimated_cost_usd,input_cost_usd,output_cost_usd,calculated_cost_usd,saved_vs_baseline,saved_percent,saved_cost_vs_baseline,saved_cost_percent",
    ...rows.map((row) => [
      row.plugin,
      row.task,
      row.run,
      row.dryRun,
      row.prepareOnly,
      row.failed,
      row.timedOut,
      row.durationMs,
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
    "task,plugin,runs,failed_runs,timeout_count,median_duration_ms,average_input_tokens,average_output_tokens,average_cache_read_tokens,average_cache_write_tokens,median_total_tokens,average_total_tokens,p25_total_tokens,p75_total_tokens,min_total_tokens,max_total_tokens,average_provider_estimated_cost_usd,average_input_cost_usd,average_output_cost_usd,median_calculated_cost_usd,average_calculated_cost_usd,p25_calculated_cost_usd,p75_calculated_cost_usd,min_calculated_cost_usd,max_calculated_cost_usd,median_saved_vs_baseline,average_saved_vs_baseline,median_saved_percent,average_saved_percent,median_saved_cost_vs_baseline,average_saved_cost_vs_baseline,median_saved_cost_percent,average_saved_cost_percent",
    ...summariesByTaskAndPlugin(rows).map((summary) => [
      summary.task,
      summary.plugin,
      summary.runs,
      summary.failedRuns,
      summary.timeoutCount,
      summary.medianDurationMs.toFixed(0),
      summary.averageInputTokens.toFixed(2),
      summary.averageOutputTokens.toFixed(2),
      summary.averageCacheReadTokens.toFixed(2),
      summary.averageCacheWriteTokens.toFixed(2),
      summary.medianTotalTokens.toFixed(2),
      summary.averageTotalTokens.toFixed(2),
      summary.p25TotalTokens.toFixed(2),
      summary.p75TotalTokens.toFixed(2),
      summary.minTotalTokens.toFixed(2),
      summary.maxTotalTokens.toFixed(2),
      formatCsvNumber(summary.averageEstimatedCostUsd),
      formatCsvNumber(summary.averageInputCostUsd),
      formatCsvNumber(summary.averageOutputCostUsd),
      formatCsvNumber(summary.medianCalculatedCostUsd),
      formatCsvNumber(summary.averageCalculatedCostUsd),
      formatCsvNumber(summary.p25CalculatedCostUsd),
      formatCsvNumber(summary.p75CalculatedCostUsd),
      formatCsvNumber(summary.minCalculatedCostUsd),
      formatCsvNumber(summary.maxCalculatedCostUsd),
      summary.medianSavedVsBaseline.toFixed(2),
      summary.averageSavedVsBaseline.toFixed(2),
      summary.medianSavedPercent.toFixed(2),
      summary.averageSavedPercent.toFixed(2),
      formatCsvNumber(summary.medianSavedCostVsBaseline),
      formatCsvNumber(summary.averageSavedCostVsBaseline),
      summary.medianSavedCostPercent.toFixed(2),
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
    "| Plugin | Runs | Failed | Timeouts | Median Total Tokens | Average Total Tokens | P25 Total | P75 Total | Min Total | Max Total | Median Duration | Median Saved Tokens | Average Saved Tokens | Median Cost | Average Cost | Median Saved Cost | Average Saved Cost |",
    "| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |"
  ]

  for (const summary of summariesByPlugin(rows)) {
    lines.push(`| ${summary.plugin} | ${summary.runs} | ${summary.failedRuns} | ${summary.timeoutCount} | ${formatToken(summary.medianTotalTokens)} | ${formatToken(summary.averageTotalTokens)} | ${formatToken(summary.p25TotalTokens)} | ${formatToken(summary.p75TotalTokens)} | ${formatToken(summary.minTotalTokens)} | ${formatToken(summary.maxTotalTokens)} | ${formatDuration(summary.medianDurationMs)} | ${formatToken(summary.medianSavedVsBaseline)} | ${formatToken(summary.averageSavedVsBaseline)} | ${formatMoney(summary.medianCalculatedCostUsd)} | ${formatMoney(summary.averageCalculatedCostUsd)} | ${formatMoney(summary.medianSavedCostVsBaseline)} | ${formatMoney(summary.averageSavedCostVsBaseline)} |`)
  }

  lines.push(
    "",
    "## By Task",
    "",
    "| Task | Plugin | Runs | Failed | Timeouts | Median Total Tokens | Average Total Tokens | P25 Total | P75 Total | Median Saved % | Average Saved % | Median Cost | Average Cost |",
    "| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |"
  )

  for (const summary of summariesByTaskAndPlugin(rows)) {
    lines.push(`| ${summary.task} | ${summary.plugin} | ${summary.runs} | ${summary.failedRuns} | ${summary.timeoutCount} | ${formatToken(summary.medianTotalTokens)} | ${formatToken(summary.averageTotalTokens)} | ${formatToken(summary.p25TotalTokens)} | ${formatToken(summary.p75TotalTokens)} | ${formatPercent(summary.medianSavedPercent)} | ${formatPercent(summary.averageSavedPercent)} | ${formatMoney(summary.medianCalculatedCostUsd)} | ${formatMoney(summary.averageCalculatedCostUsd)} |`)
  }

  lines.push(
    "",
    "## Best By Task",
    "",
    "| Task | Lowest Median Tokens | Lowest Median Cost |",
    "| --- | --- | --- |"
  )

  for (const summary of bestByTask(rows)) {
    lines.push(`| ${summary.task} | ${summary.tokensPlugin} (${formatToken(summary.medianTotalTokens)}) | ${summary.costPlugin} (${formatMoney(summary.medianCalculatedCostUsd)}) |`)
  }

  lines.push("", `CSV: \`${join(resultsRoot, "tokens.csv")}\``, `Averages CSV: \`${join(resultsRoot, "averages.csv")}\``, "")
  return lines.join("\n")
}

export function renderHtml(rows, resultsRoot) {
  const costRankings = costSavingsRankings(rows)
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>TokenWarden Benchmark Report</title>
  <style>
    :root { color-scheme: light; --ink: #17202a; --muted: #667085; --line: #d9dee7; --panel: #f7f8fb; --accent: #0f766e; }
    body { margin: 0; font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; color: var(--ink); background: #fff; }
    main { max-width: 1180px; margin: 0 auto; padding: 40px 24px 56px; }
    h1 { margin: 0 0 12px; font-size: clamp(32px, 5vw, 54px); line-height: 1; letter-spacing: -0.04em; }
    h2 { margin: 36px 0 14px; font-size: 22px; letter-spacing: -0.02em; }
    p { color: var(--muted); line-height: 1.55; }
    code { padding: 2px 5px; border-radius: 5px; background: var(--panel); color: var(--ink); }
    .table-wrap { overflow-x: auto; border: 1px solid var(--line); border-radius: 12px; }
    table { width: 100%; border-collapse: collapse; font-size: 13px; }
    th, td { padding: 10px 12px; border-bottom: 1px solid var(--line); text-align: right; white-space: nowrap; }
    th:first-child, td:first-child, .left { text-align: left; }
    th { background: var(--panel); color: #344054; font-weight: 650; }
    tr:last-child td { border-bottom: 0; }
    a { color: var(--accent); }
    .ranking { margin: 24px 0 6px; padding: 18px; border: 1px solid var(--line); border-radius: 16px; background: var(--panel); }
    .ranking h2 { margin-top: 0; }
    .ranking ol { margin: 0; padding-left: 24px; }
    .ranking li { padding: 8px 0; }
    .ranking strong { color: var(--accent); }
    .links { margin-top: 24px; }
  </style>
</head>
<body>
  <main>
    <h1>TokenWarden Benchmark Report</h1>
    <p>Results: <code>${escapeHtml(resultsRoot)}</code></p>
    <p>Calculated costs use $${INPUT_TOKEN_PRICE_PER_MILLION_USD}/1M input tokens and $${OUTPUT_TOKEN_PRICE_PER_MILLION_USD}/1M output tokens.</p>
    ${renderCostSavingsRanking(costRankings)}
    ${renderHtmlTable("Overall", ["Plugin", "Runs", "Failed", "Timeouts", "Median Total Tokens", "Average Total Tokens", "P25 Total", "P75 Total", "Min Total", "Max Total", "Median Duration", "Median Saved Tokens", "Average Saved Tokens", "Median Cost", "Average Cost", "Median Saved Cost", "Average Saved Cost"], summariesByPlugin(rows).map((summary) => [summary.plugin, summary.runs, summary.failedRuns, summary.timeoutCount, formatToken(summary.medianTotalTokens), formatToken(summary.averageTotalTokens), formatToken(summary.p25TotalTokens), formatToken(summary.p75TotalTokens), formatToken(summary.minTotalTokens), formatToken(summary.maxTotalTokens), formatDuration(summary.medianDurationMs), formatToken(summary.medianSavedVsBaseline), formatToken(summary.averageSavedVsBaseline), formatMoney(summary.medianCalculatedCostUsd), formatMoney(summary.averageCalculatedCostUsd), formatMoney(summary.medianSavedCostVsBaseline), formatMoney(summary.averageSavedCostVsBaseline)]))}
    ${renderHtmlTable("By Task", ["Task", "Plugin", "Runs", "Failed", "Timeouts", "Median Total Tokens", "Average Total Tokens", "P25 Total", "P75 Total", "Median Saved %", "Average Saved %", "Median Cost", "Average Cost"], summariesByTaskAndPlugin(rows).map((summary) => [summary.task, summary.plugin, summary.runs, summary.failedRuns, summary.timeoutCount, formatToken(summary.medianTotalTokens), formatToken(summary.averageTotalTokens), formatToken(summary.p25TotalTokens), formatToken(summary.p75TotalTokens), formatPercent(summary.medianSavedPercent), formatPercent(summary.averageSavedPercent), formatMoney(summary.medianCalculatedCostUsd), formatMoney(summary.averageCalculatedCostUsd)]))}
    ${renderHtmlTable("Best By Task", ["Task", "Lowest Median Tokens", "Lowest Median Cost"], bestByTask(rows).map((summary) => [summary.task, `${summary.tokensPlugin} (${formatToken(summary.medianTotalTokens)})`, `${summary.costPlugin} (${formatMoney(summary.medianCalculatedCostUsd)})`]))}
    <p class="links">CSV: <code>${escapeHtml(join(resultsRoot, "tokens.csv"))}</code><br />Averages CSV: <code>${escapeHtml(join(resultsRoot, "averages.csv"))}</code></p>
  </main>
</body>
</html>`
}

function renderCostSavingsRanking(rankings) {
  if (!rankings.length) return ""
  const winner = rankings[0]
  return `<section class="ranking">
      <h2>Overall Money Saved Ranking</h2>
      <p><strong>${escapeHtml(winner.plugin)}</strong> saved the most money overall: <strong>${escapeHtml(formatMoney(winner.savedCostUsd))}</strong> (${escapeHtml(formatPercent(winner.savedCostPercent))}) across ${escapeHtml(winner.runs)} runs.</p>
      <ol>${rankings.map((ranking) => `<li><strong>${escapeHtml(ranking.plugin)}</strong>: ${escapeHtml(formatMoney(ranking.savedCostUsd))} saved (${escapeHtml(formatPercent(ranking.savedCostPercent))}) across ${escapeHtml(ranking.runs)} runs</li>`).join("")}</ol>
    </section>`
}

function costSavingsRankings(rows) {
  return [...groupRows(rows.filter((row) => row.plugin !== "baseline"), (row) => row.plugin).entries()]
    .map(([plugin, group]) => ({
      plugin,
      runs: group.length,
      savedCostUsd: group.reduce((total, row) => total + row.savedCostVsBaseline, 0),
      baselineCostUsd: group.reduce((total, row) => total + row.savedCostVsBaseline + row.calculatedCostUsd, 0)
    }))
    .map((ranking) => ({
      ...ranking,
      savedCostPercent: ranking.baselineCostUsd > 0 ? (ranking.savedCostUsd / ranking.baselineCostUsd) * 100 : 0
    }))
    .sort((a, b) => b.savedCostUsd - a.savedCostUsd)
}

function renderHtmlTable(title, headers, rows) {
  return `<h2>${escapeHtml(title)}</h2>
    <div class="table-wrap">
      <table>
        <thead><tr>${headers.map((header, index) => `<th${index === 0 ? " class=\"left\"" : ""}>${escapeHtml(header)}</th>`).join("")}</tr></thead>
        <tbody>${rows.map((row) => `<tr>${row.map((cell, index) => `<td${index === 0 ? " class=\"left\"" : ""}>${escapeHtml(cell)}</td>`).join("")}</tr>`).join("")}</tbody>
      </table>
    </div>`
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;")
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

export function percentile(values, percentileValue) {
  if (!values.length) return 0
  const sorted = [...values].sort((a, b) => a - b)
  const index = (sorted.length - 1) * percentileValue
  const lower = Math.floor(index)
  const upper = Math.ceil(index)
  if (lower === upper) return sorted[lower]
  return sorted[lower] + (sorted[upper] - sorted[lower]) * (index - lower)
}

export function bestByTask(rows) {
  return [...groupRows(rows, (row) => row.task).entries()].map(([task, group]) => {
    const summaries = [...groupRows(group, (row) => row.plugin).entries()].map(([plugin, pluginRows]) => summarizeRows(pluginRows, { plugin }))
    const bestTokens = [...summaries].sort((a, b) => a.medianTotalTokens - b.medianTotalTokens)[0]
    const bestCost = [...summaries].sort((a, b) => a.medianCalculatedCostUsd - b.medianCalculatedCostUsd)[0]
    return {
      task,
      tokensPlugin: bestTokens?.plugin ?? "",
      medianTotalTokens: bestTokens?.medianTotalTokens ?? 0,
      costPlugin: bestCost?.plugin ?? "",
      medianCalculatedCostUsd: bestCost?.medianCalculatedCostUsd ?? 0
    }
  })
}

function summarizeRows(rows, labels) {
  const totalTokens = rows.map((row) => row.totalTokens)
  const calculatedCosts = rows.map((row) => row.calculatedCostUsd)
  return {
    ...labels,
    runs: rows.length,
    failedRuns: rows.filter((row) => row.failed).length,
    timeoutCount: rows.filter((row) => row.timedOut).length,
    medianDurationMs: median(rows.map((row) => row.durationMs)),
    medianTotalTokens: median(totalTokens),
    averageTotalTokens: average(totalTokens),
    p25TotalTokens: percentile(totalTokens, 0.25),
    p75TotalTokens: percentile(totalTokens, 0.75),
    minTotalTokens: totalTokens.length ? Math.min(...totalTokens) : 0,
    maxTotalTokens: totalTokens.length ? Math.max(...totalTokens) : 0,
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
    medianCalculatedCostUsd: median(calculatedCosts),
    averageCalculatedCostUsd: average(calculatedCosts),
    p25CalculatedCostUsd: percentile(calculatedCosts, 0.25),
    p75CalculatedCostUsd: percentile(calculatedCosts, 0.75),
    minCalculatedCostUsd: calculatedCosts.length ? Math.min(...calculatedCosts) : 0,
    maxCalculatedCostUsd: calculatedCosts.length ? Math.max(...calculatedCosts) : 0,
    medianSavedCostVsBaseline: median(rows.map((row) => row.savedCostVsBaseline)),
    averageSavedCostVsBaseline: average(rows.map((row) => row.savedCostVsBaseline)),
    medianSavedCostPercent: median(rows.map((row) => row.savedCostPercent)),
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

function formatDuration(value) {
  return `${Number(value).toFixed(0)}ms`
}
