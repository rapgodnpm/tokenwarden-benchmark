export function parseUsageFromJsonLines(text) {
  const usage = emptyUsage()
  const sessionIDs = new Set()
  const answerParts = []
  const rawEvents = []
  const usageBuckets = {
    stepEvents: new Map(),
    stepParts: new Map(),
    assistantMessages: new Map(),
    generic: []
  }

  for (const line of text.split(/\r?\n/)) {
    if (!line.trim()) continue
    let event
    try {
      event = JSON.parse(line)
    } catch {
      continue
    }
    rawEvents.push(event)
    collectSessionIDs(event, sessionIDs)
    collectAnswerText(event, answerParts)
    collectUsage(event, usageBuckets)
  }

  for (const found of selectedUsageObjects(usageBuckets)) mergeUsage(usage, found)

  usage.totalTokens = usage.totalTokens || usage.inputTokens + usage.outputTokens + usage.cacheReadTokens + usage.cacheWriteTokens
  return {
    ...usage,
    sessionIDs: [...sessionIDs],
    answer: answerParts.join("\n").trim(),
    rawEventCount: rawEvents.length
  }
}

export function summarizeUsage(rawUsage) {
  const usage = { ...emptyUsage(), ...rawUsage }
  usage.totalTokens = usage.totalTokens || usage.inputTokens + usage.outputTokens + usage.cacheReadTokens + usage.cacheWriteTokens
  return usage
}

export function hasMeasuredUsage(usage) {
  return Number(usage?.totalTokens) > 0
}

function emptyUsage() {
  return {
    inputTokens: 0,
    outputTokens: 0,
    cacheReadTokens: 0,
    cacheWriteTokens: 0,
    totalTokens: 0,
    estimatedCostUsd: 0
  }
}

function mergeUsage(target, source) {
  const tokens = objectValue(source.tokens)
  const cache = objectValue(tokens?.cache)
  target.inputTokens += numberValue(source.inputTokens ?? source.input_tokens ?? source.promptTokens ?? source.prompt_tokens ?? source.input ?? tokens?.input ?? tokens?.input_tokens ?? tokens?.prompt ?? tokens?.prompt_tokens)
  target.outputTokens += numberValue(source.outputTokens ?? source.output_tokens ?? source.completionTokens ?? source.completion_tokens ?? source.output ?? tokens?.output ?? tokens?.output_tokens ?? tokens?.completion ?? tokens?.completion_tokens)
  target.cacheReadTokens += numberValue(source.cacheReadTokens ?? source.cache_read_tokens ?? source.cachedInputTokens ?? source.cached_input_tokens ?? tokens?.cacheReadTokens ?? tokens?.cache_read_tokens ?? tokens?.cache_read ?? cache?.read)
  target.cacheWriteTokens += numberValue(source.cacheWriteTokens ?? source.cache_write_tokens ?? tokens?.cacheWriteTokens ?? tokens?.cache_write_tokens ?? tokens?.cache_write ?? cache?.write)
  target.totalTokens += numberValue(source.totalTokens ?? source.total_tokens ?? source.total ?? tokens?.totalTokens ?? tokens?.total_tokens ?? tokens?.total)
  target.estimatedCostUsd += numberValue(source.estimatedCostUsd ?? source.costUsd ?? source.cost_usd ?? source.cost)
}

function collectUsage(event, buckets) {
  let foundKnownUsage = false
  if (event?.type === "sync" && event.name === "session.next.step.ended.1" && looksLikeUsage(event.data)) {
    buckets.stepEvents.set(event.id ?? `${event.data.sessionID ?? "session"}:${event.data.timestamp ?? buckets.stepEvents.size}`, event.data)
    foundKnownUsage = true
  }

  const part = event?.data?.part
  if (part?.type === "step-finish" && looksLikeUsage(part)) {
    buckets.stepParts.set(part.id ?? `${part.messageID ?? event.data?.sessionID ?? "message"}:${buckets.stepParts.size}`, part)
    foundKnownUsage = true
  }

  const message = event?.data?.info ?? event?.message ?? event?.info
  if (message?.role === "assistant" && looksLikeUsage(message)) {
    buckets.assistantMessages.set(message.id ?? `${message.sessionID ?? event?.data?.sessionID ?? "session"}:${buckets.assistantMessages.size}`, message)
    foundKnownUsage = true
  }

  if (!foundKnownUsage) buckets.generic.push(...findUsageObjects(event))
}

function selectedUsageObjects(buckets) {
  if (buckets.stepEvents.size) return [...buckets.stepEvents.values()]
  if (buckets.stepParts.size) return [...buckets.stepParts.values()]
  if (buckets.assistantMessages.size) return [...buckets.assistantMessages.values()]
  return [...new Set(buckets.generic)]
}

function findUsageObjects(value, results = []) {
  if (!value || typeof value !== "object") return results
  if (looksLikeUsage(value)) {
    results.push(value)
    return results
  }
  for (const key of ["usage", "tokenUsage", "tokens", "cost"]) {
    if (value[key] && typeof value[key] === "object" && looksLikeUsage(value[key])) results.push(value[key])
  }
  for (const child of Object.values(value)) {
    if (child && typeof child === "object") findUsageObjects(child, results)
  }
  return [...new Set(results)]
}

function looksLikeUsage(value) {
  if (!value || typeof value !== "object") return false
  const tokens = objectValue(value?.tokens)
  return [
    "inputTokens",
    "input_tokens",
    "promptTokens",
    "prompt_tokens",
    "outputTokens",
    "output_tokens",
    "completionTokens",
    "completion_tokens",
    "totalTokens",
    "total_tokens",
    "costUsd",
    "cost_usd"
  ].some((key) => key in value) || Boolean(tokens && ["input", "input_tokens", "output", "output_tokens", "total", "total_tokens"].some((key) => key in tokens))
}

function collectSessionIDs(value, sessionIDs) {
  if (!value || typeof value !== "object") return
  for (const key of ["sessionID", "sessionId", "session_id"]) {
    if (typeof value[key] === "string" && value[key]) sessionIDs.add(value[key])
  }
  for (const child of Object.values(value)) {
    if (child && typeof child === "object") collectSessionIDs(child, sessionIDs)
  }
}

function collectAnswerText(event, answerParts) {
  const type = String(event.type ?? event.event ?? "")
  const text = event.text ?? event.content ?? event.message?.content ?? event.part?.text
  if (typeof text === "string" && /assistant|message|text|content|part/i.test(type)) answerParts.push(text)
}

function numberValue(value) {
  const parsed = typeof value === "number" ? value : typeof value === "string" && value.trim() ? Number(value) : 0
  return Number.isFinite(parsed) ? parsed : 0
}

function objectValue(value) {
  return value && typeof value === "object" ? value : undefined
}
