import { join } from "node:path"

export const INPUT_TOKEN_PRICE_PER_MILLION_USD = 5
export const OUTPUT_TOKEN_PRICE_PER_MILLION_USD = 25

export function createReportRows(summaries) {
  const rows = summaries.map((summary) => {
    const inputTokens = summary.usage.inputTokens ?? 0
    const outputTokens = summary.usage.outputTokens ?? 0
    const totalTokens = summary.usage.totalTokens ?? 0
    const inputCostUsd = tokenCost(inputTokens, INPUT_TOKEN_PRICE_PER_MILLION_USD)
    const outputCostUsd = tokenCost(outputTokens, OUTPUT_TOKEN_PRICE_PER_MILLION_USD)
    const metricsIncluded = totalTokens > 0
    return {
      platform: summary.platform ?? "opencode",
      plugin: summary.plugin,
      task: summary.task,
      run: summary.run,
      dryRun: summary.dryRun,
      prepareOnly: summary.prepareOnly,
      inputTokens,
      outputTokens,
      cacheReadTokens: summary.usage.cacheReadTokens ?? 0,
      cacheWriteTokens: summary.usage.cacheWriteTokens ?? 0,
      totalTokens,
      metricsIncluded,
      estimatedCostUsd: summary.usage.estimatedCostUsd ?? 0,
      inputCostUsd,
      outputCostUsd,
      calculatedCostUsd: inputCostUsd + outputCostUsd,
      failed: Boolean(summary.failed) || (!summary.dryRun && !summary.prepareOnly && !metricsIncluded),
      timedOut: Boolean(summary.timedOut),
      durationMs: summary.durationMs ?? summary.opencode?.durationMs ?? summary.claudeCode?.durationMs ?? 0
    }
  })

  const baselines = new Map(rows.filter((row) => row.plugin === "baseline" && row.metricsIncluded).map((row) => [`${row.platform}:${row.task}:${row.run}`, row]))
  for (const row of rows) {
    const key = `${row.platform}:${row.task}:${row.run}`
    const baseline = baselines.get(key)
    row.comparisonIncluded = row.plugin === "baseline" ? row.metricsIncluded : row.metricsIncluded && Boolean(baseline)
    if (!row.comparisonIncluded) continue
    const baselineTotalTokens = row.plugin === "baseline" ? row.totalTokens : baseline.totalTokens
    const baselineCalculatedCost = row.plugin === "baseline" ? row.calculatedCostUsd : baseline.calculatedCostUsd
    row.savedVsBaseline = row.plugin === "baseline" ? 0 : baselineTotalTokens - row.totalTokens
    row.savedPercent = row.plugin === "baseline" ? 0 : (row.savedVsBaseline / baselineTotalTokens) * 100
    row.savedCostVsBaseline = row.plugin === "baseline" ? 0 : baselineCalculatedCost - row.calculatedCostUsd
    row.savedCostPercent = baselineCalculatedCost > 0 ? (row.savedCostVsBaseline / baselineCalculatedCost) * 100 : undefined
  }

  return rows
}

export function renderTokensCsv(rows) {
  return [
    "platform,plugin,task,run,dry_run,prepare_only,failed,timed_out,metrics_included,duration_ms,input_tokens,output_tokens,cache_read_tokens,cache_write_tokens,total_tokens,provider_estimated_cost_usd,input_cost_usd,output_cost_usd,calculated_cost_usd,saved_vs_baseline,saved_percent,saved_cost_vs_baseline,saved_cost_percent",
    ...rows.map((row) => [
      row.platform,
      row.plugin,
      row.task,
      row.run,
      row.dryRun,
      row.prepareOnly,
      row.failed,
      row.timedOut,
      row.metricsIncluded,
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
      formatCsvValue(row.savedVsBaseline),
      formatCsvMetric(row.savedPercent),
      formatCsvNumber(row.savedCostVsBaseline),
      formatCsvMetric(row.savedCostPercent)
    ].join(","))
  ].join("\n")
}

export function renderAveragesCsv(rows) {
  return [
    "platform,task,plugin,status,runs,metric_runs,ignored_runs,comparison_runs,failed_runs,timeout_count,median_duration_ms,average_input_tokens,average_output_tokens,average_cache_read_tokens,average_cache_write_tokens,median_total_tokens,average_total_tokens,p25_total_tokens,p75_total_tokens,min_total_tokens,max_total_tokens,average_provider_estimated_cost_usd,average_input_cost_usd,average_output_cost_usd,median_calculated_cost_usd,average_calculated_cost_usd,p25_calculated_cost_usd,p75_calculated_cost_usd,min_calculated_cost_usd,max_calculated_cost_usd,median_saved_vs_baseline,average_saved_vs_baseline,median_saved_percent,average_saved_percent,median_saved_cost_vs_baseline,average_saved_cost_vs_baseline,median_saved_cost_percent,average_saved_cost_percent",
    ...summariesByTaskAndPlugin(rows).map((summary) => [
      summary.platform,
      summary.task,
      summary.plugin,
      summary.failed ? "failed" : "ok",
      summary.runs,
      summary.metricRuns,
      summary.ignoredRuns,
      summary.comparisonRuns,
      summary.failedRuns,
      summary.timeoutCount,
      formatCsvMetric(summary.medianDurationMs, 0),
      formatCsvMetric(summary.averageInputTokens),
      formatCsvMetric(summary.averageOutputTokens),
      formatCsvMetric(summary.averageCacheReadTokens),
      formatCsvMetric(summary.averageCacheWriteTokens),
      formatCsvMetric(summary.medianTotalTokens),
      formatCsvMetric(summary.averageTotalTokens),
      formatCsvMetric(summary.p25TotalTokens),
      formatCsvMetric(summary.p75TotalTokens),
      formatCsvMetric(summary.minTotalTokens),
      formatCsvMetric(summary.maxTotalTokens),
      formatCsvNumber(summary.averageEstimatedCostUsd),
      formatCsvNumber(summary.averageInputCostUsd),
      formatCsvNumber(summary.averageOutputCostUsd),
      formatCsvNumber(summary.medianCalculatedCostUsd),
      formatCsvNumber(summary.averageCalculatedCostUsd),
      formatCsvNumber(summary.p25CalculatedCostUsd),
      formatCsvNumber(summary.p75CalculatedCostUsd),
      formatCsvNumber(summary.minCalculatedCostUsd),
      formatCsvNumber(summary.maxCalculatedCostUsd),
      formatCsvMetric(summary.medianSavedVsBaseline),
      formatCsvMetric(summary.averageSavedVsBaseline),
      formatCsvMetric(summary.medianSavedPercent),
      formatCsvMetric(summary.averageSavedPercent),
      formatCsvNumber(summary.medianSavedCostVsBaseline),
      formatCsvNumber(summary.averageSavedCostVsBaseline),
      formatCsvMetric(summary.medianSavedCostPercent),
      formatCsvMetric(summary.averageSavedCostPercent)
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
    "| Plugin | Status | Runs | Included | Ignored | Failed | Timeouts | Median Total Tokens | Average Total Tokens | P25 Total | P75 Total | Min Total | Max Total | Median Duration | Median Saved Tokens | Average Saved Tokens | Median Cost | Average Cost | Median Saved Cost | Average Saved Cost |",
    "| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |"
  ]

  for (const summary of summariesByPlugin(rows)) {
    lines.push(`| ${summary.plugin} | ${summary.failed ? "FAILED" : "OK"} | ${summary.runs} | ${summary.metricRuns} | ${summary.ignoredRuns} | ${summary.failedRuns} | ${summary.timeoutCount} | ${formatToken(summary.medianTotalTokens)} | ${formatToken(summary.averageTotalTokens)} | ${formatToken(summary.p25TotalTokens)} | ${formatToken(summary.p75TotalTokens)} | ${formatToken(summary.minTotalTokens)} | ${formatToken(summary.maxTotalTokens)} | ${formatDuration(summary.medianDurationMs)} | ${formatToken(summary.medianSavedVsBaseline)} | ${formatToken(summary.averageSavedVsBaseline)} | ${formatMoney(summary.medianCalculatedCostUsd)} | ${formatMoney(summary.averageCalculatedCostUsd)} | ${formatMoney(summary.medianSavedCostVsBaseline)} | ${formatMoney(summary.averageSavedCostVsBaseline)} |`)
  }

  lines.push(
    "",
    "## By Task",
    "",
    "| Task | Plugin | Status | Runs | Included | Ignored | Failed | Timeouts | Median Total Tokens | Average Total Tokens | P25 Total | P75 Total | Median Saved % | Average Saved % | Median Cost | Average Cost |",
    "| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |"
  )

  for (const summary of summariesByTaskAndPlugin(rows)) {
    lines.push(`| ${summary.task} | ${summary.plugin} | ${summary.failed ? "FAILED" : "OK"} | ${summary.runs} | ${summary.metricRuns} | ${summary.ignoredRuns} | ${summary.failedRuns} | ${summary.timeoutCount} | ${formatToken(summary.medianTotalTokens)} | ${formatToken(summary.averageTotalTokens)} | ${formatToken(summary.p25TotalTokens)} | ${formatToken(summary.p75TotalTokens)} | ${formatPercent(summary.medianSavedPercent)} | ${formatPercent(summary.averageSavedPercent)} | ${formatMoney(summary.medianCalculatedCostUsd)} | ${formatMoney(summary.averageCalculatedCostUsd)} |`)
  }

  lines.push(
    "",
    "## Best By Task",
    "",
    "| Task | Lowest Median Tokens | Lowest Median Cost |",
    "| --- | --- | --- |"
  )

  for (const summary of bestByTask(rows)) {
    lines.push(`| ${summary.task} | ${summary.tokensPlugin ? `${summary.tokensPlugin} (${formatToken(summary.medianTotalTokens)})` : "N/A"} | ${summary.costPlugin ? `${summary.costPlugin} (${formatMoney(summary.medianCalculatedCostUsd)})` : "N/A"} |`)
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
    ${renderHtmlTable("Overall", ["Plugin", "Status", "Runs", "Included", "Ignored", "Failed", "Timeouts", "Median Total Tokens", "Average Total Tokens", "P25 Total", "P75 Total", "Min Total", "Max Total", "Median Duration", "Median Saved Tokens", "Average Saved Tokens", "Median Cost", "Average Cost", "Median Saved Cost", "Average Saved Cost"], summariesByPlugin(rows).map((summary) => [summary.plugin, summary.failed ? "FAILED" : "OK", summary.runs, summary.metricRuns, summary.ignoredRuns, summary.failedRuns, summary.timeoutCount, formatToken(summary.medianTotalTokens), formatToken(summary.averageTotalTokens), formatToken(summary.p25TotalTokens), formatToken(summary.p75TotalTokens), formatToken(summary.minTotalTokens), formatToken(summary.maxTotalTokens), formatDuration(summary.medianDurationMs), formatToken(summary.medianSavedVsBaseline), formatToken(summary.averageSavedVsBaseline), formatMoney(summary.medianCalculatedCostUsd), formatMoney(summary.averageCalculatedCostUsd), formatMoney(summary.medianSavedCostVsBaseline), formatMoney(summary.averageSavedCostVsBaseline)]))}
    ${renderHtmlTable("By Task", ["Task", "Plugin", "Status", "Runs", "Included", "Ignored", "Failed", "Timeouts", "Median Total Tokens", "Average Total Tokens", "P25 Total", "P75 Total", "Median Saved %", "Average Saved %", "Median Cost", "Average Cost"], summariesByTaskAndPlugin(rows).map((summary) => [summary.task, summary.plugin, summary.failed ? "FAILED" : "OK", summary.runs, summary.metricRuns, summary.ignoredRuns, summary.failedRuns, summary.timeoutCount, formatToken(summary.medianTotalTokens), formatToken(summary.averageTotalTokens), formatToken(summary.p25TotalTokens), formatToken(summary.p75TotalTokens), formatPercent(summary.medianSavedPercent), formatPercent(summary.averageSavedPercent), formatMoney(summary.medianCalculatedCostUsd), formatMoney(summary.averageCalculatedCostUsd)]))}
    ${renderHtmlTable("Best By Task", ["Task", "Lowest Median Tokens", "Lowest Median Cost"], bestByTask(rows).map((summary) => [summary.task, summary.tokensPlugin ? `${summary.tokensPlugin} (${formatToken(summary.medianTotalTokens)})` : "N/A", summary.costPlugin ? `${summary.costPlugin} (${formatMoney(summary.medianCalculatedCostUsd)})` : "N/A"]))}
    <p class="links">CSV: <code>${escapeHtml(join(resultsRoot, "tokens.csv"))}</code><br />Averages CSV: <code>${escapeHtml(join(resultsRoot, "averages.csv"))}</code></p>
  </main>
</body>
</html>`
}

function renderCostSavingsRanking(rankings) {
  if (!rankings.length) return ""
  const winner = rankings[0]
  const winnerMessage = winner.hasComparison
    ? `<p><strong>${escapeHtml(winner.plugin)}</strong> saved the most money overall: <strong>${escapeHtml(formatMoney(winner.savedCostUsd))}</strong> (${escapeHtml(formatPercent(winner.savedCostPercent))}) across ${escapeHtml(winner.runs)} runs.</p>`
    : "<p>No plugin produced a valid token-usage comparison.</p>"
  return `<section class="ranking">
      <h2>Overall Money Saved Ranking</h2>
      ${winnerMessage}
      <ol>${rankings.map((ranking) => `<li><strong>${escapeHtml(ranking.plugin)}</strong>: ${escapeHtml(ranking.hasComparison ? formatMoney(ranking.savedCostUsd) : "N/A")} saved (${escapeHtml(ranking.hasComparison ? formatPercent(ranking.savedCostPercent) : "N/A")}) across ${escapeHtml(ranking.runs)} runs${ranking.failed ? " (FAILED)" : ""}</li>`).join("")}</ol>
    </section>`
}

function costSavingsRankings(rows) {
  return [...groupRows(rows.filter((row) => row.plugin !== "baseline"), (row) => row.plugin).entries()]
    .map(([plugin, group]) => {
      const summary = summarizeRows(group, { plugin })
      const comparisonRows = group.filter((row) => row.comparisonIncluded)
      const savedCostUsd = comparisonRows.reduce((total, row) => total + row.savedCostVsBaseline, 0)
      const baselineCostUsd = comparisonRows.reduce((total, row) => total + row.savedCostVsBaseline + row.calculatedCostUsd, 0)
      return {
        ...summary,
        savedCostUsd,
        savedCostPercent: baselineCostUsd > 0 ? (savedCostUsd / baselineCostUsd) * 100 : undefined,
        hasComparison: comparisonRows.length > 0
      }
    })
    .sort((a, b) => Number(a.ignoredRuns > 0) - Number(b.ignoredRuns > 0) || Number(a.failed) - Number(b.failed) || Number(b.hasComparison) - Number(a.hasComparison) || b.savedCostUsd - a.savedCostUsd || a.plugin.localeCompare(b.plugin))
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
  return [...groupRows(rows, (row) => `${row.platform}\0${row.plugin}`).entries()]
    .map(([, group]) => summarizeRows(group, { platform: group[0]?.platform ?? "", plugin: group[0]?.plugin ?? "" }))
    .sort((a, b) => Number(a.ignoredRuns > 0) - Number(b.ignoredRuns > 0) || Number(a.failed) - Number(b.failed) || a.plugin.localeCompare(b.plugin))
}

export function summariesByTaskAndPlugin(rows) {
  return [...groupRows(rows, (row) => `${row.platform}\0${row.task}\0${row.plugin}`).entries()]
    .map(([, group]) => summarizeRows(group, { platform: group[0]?.platform ?? "", task: group[0]?.task ?? "", plugin: group[0]?.plugin ?? "" }))
    .sort((a, b) => a.task.localeCompare(b.task) || Number(a.ignoredRuns > 0) - Number(b.ignoredRuns > 0) || Number(a.failed) - Number(b.failed) || a.plugin.localeCompare(b.plugin))
}

export function average(values) {
  return values.length ? values.reduce((total, value) => total + value, 0) / values.length : undefined
}

export function median(values) {
  if (!values.length) return undefined
  const sorted = [...values].sort((a, b) => a - b)
  const middle = Math.floor(sorted.length / 2)
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2
}

export function percentile(values, percentileValue) {
  if (!values.length) return undefined
  const sorted = [...values].sort((a, b) => a - b)
  const index = (sorted.length - 1) * percentileValue
  const lower = Math.floor(index)
  const upper = Math.ceil(index)
  if (lower === upper) return sorted[lower]
  return sorted[lower] + (sorted[upper] - sorted[lower]) * (index - lower)
}

export function bestByTask(rows) {
  return [...groupRows(rows, (row) => `${row.platform}\0${row.task}`).entries()].map(([, group]) => {
    const task = group[0]?.task ?? ""
    const summaries = [...groupRows(group, (row) => row.plugin).entries()]
      .map(([plugin, pluginRows]) => summarizeRows(pluginRows, { plugin }))
      .filter((summary) => summary.metricRuns > 0 && !summary.failed)
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
  const metricRows = rows.filter((row) => row.metricsIncluded)
  const comparisonRows = rows.filter((row) => row.comparisonIncluded)
  const totalTokens = metricRows.map((row) => row.totalTokens)
  const calculatedCosts = metricRows.map((row) => row.calculatedCostUsd)
  const failedRuns = rows.filter((row) => row.failed).length
  return {
    ...labels,
    runs: rows.length,
    metricRuns: metricRows.length,
    ignoredRuns: rows.length - metricRows.length,
    comparisonRuns: comparisonRows.length,
    failed: failedRuns / rows.length > 0.3,
    failedRuns,
    timeoutCount: rows.filter((row) => row.timedOut).length,
    medianDurationMs: median(metricRows.map((row) => row.durationMs)),
    medianTotalTokens: median(totalTokens),
    averageTotalTokens: average(totalTokens),
    p25TotalTokens: percentile(totalTokens, 0.25),
    p75TotalTokens: percentile(totalTokens, 0.75),
    minTotalTokens: totalTokens.length ? Math.min(...totalTokens) : undefined,
    maxTotalTokens: totalTokens.length ? Math.max(...totalTokens) : undefined,
    medianSavedVsBaseline: median(comparisonRows.map((row) => row.savedVsBaseline)),
    averageSavedVsBaseline: average(comparisonRows.map((row) => row.savedVsBaseline)),
    medianSavedPercent: median(comparisonRows.map((row) => row.savedPercent)),
    averageSavedPercent: average(comparisonRows.map((row) => row.savedPercent)),
    averageInputTokens: average(metricRows.map((row) => row.inputTokens)),
    averageOutputTokens: average(metricRows.map((row) => row.outputTokens)),
    averageCacheReadTokens: average(metricRows.map((row) => row.cacheReadTokens)),
    averageCacheWriteTokens: average(metricRows.map((row) => row.cacheWriteTokens)),
    averageEstimatedCostUsd: average(metricRows.map((row) => row.estimatedCostUsd)),
    averageInputCostUsd: average(metricRows.map((row) => row.inputCostUsd)),
    averageOutputCostUsd: average(metricRows.map((row) => row.outputCostUsd)),
    medianCalculatedCostUsd: median(calculatedCosts),
    averageCalculatedCostUsd: average(calculatedCosts),
    p25CalculatedCostUsd: percentile(calculatedCosts, 0.25),
    p75CalculatedCostUsd: percentile(calculatedCosts, 0.75),
    minCalculatedCostUsd: calculatedCosts.length ? Math.min(...calculatedCosts) : undefined,
    maxCalculatedCostUsd: calculatedCosts.length ? Math.max(...calculatedCosts) : undefined,
    medianSavedCostVsBaseline: median(comparisonRows.map((row) => row.savedCostVsBaseline)),
    averageSavedCostVsBaseline: average(comparisonRows.map((row) => row.savedCostVsBaseline)),
    medianSavedCostPercent: median(comparisonRows.map((row) => row.savedCostPercent).filter((value) => value !== undefined)),
    averageSavedCostPercent: average(comparisonRows.map((row) => row.savedCostPercent).filter((value) => value !== undefined))
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
  if (value === undefined || value === null) return ""
  return Number(value).toFixed(8)
}

function formatCsvMetric(value, digits = 2) {
  if (value === undefined || value === null) return ""
  return Number(value).toFixed(digits)
}

function formatCsvValue(value) {
  return value === undefined || value === null ? "" : String(value)
}

function formatToken(value) {
  if (value === undefined || value === null) return "N/A"
  return Number(value).toFixed(0)
}

function formatMoney(value) {
  if (value === undefined || value === null) return "N/A"
  return `$${Number(value).toFixed(4)}`
}

function formatPercent(value) {
  if (value === undefined || value === null) return "N/A"
  return `${Number(value).toFixed(2)}%`
}

function formatDuration(value) {
  if (value === undefined || value === null) return "N/A"
  return `${Number(value).toFixed(0)}ms`
}
