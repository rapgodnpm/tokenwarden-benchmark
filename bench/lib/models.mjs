import { readFileSync } from "node:fs"
import { createInterface } from "node:readline/promises"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const modelsPath = join(dirname(fileURLToPath(import.meta.url)), "..", "models.json")

export const BENCHMARK_MODELS = JSON.parse(readFileSync(modelsPath, "utf8"))

export const DEFAULT_BENCHMARK_MODEL = BENCHMARK_MODELS.find((model) => model.default)?.model ?? BENCHMARK_MODELS[0].model
export const DEFAULT_CLAUDE_CODE_MODEL = BENCHMARK_MODELS.find((model) => model.claudeCodeDefault)?.claudeCodeModel
  ?? BENCHMARK_MODELS.find((model) => model.claudeCodeModel)?.claudeCodeModel

export function resolveBenchmarkModel(value, platform = "opencode") {
  const models = modelsForPlatform(platform)
  const defaultModel = platform === "claude-code" ? DEFAULT_CLAUDE_CODE_MODEL : DEFAULT_BENCHMARK_MODEL
  if (value === undefined || value === true || value === false || value === "") return defaultModel
  const requested = String(value).trim()
  const match = models.find((model) => [model.key, model.model, model.displayModel, model.claudeCodeModel, model.label].includes(requested))
  return platform === "claude-code" ? match?.claudeCodeModel ?? requested : match?.model ?? requested
}

export function benchmarkModelAliases(modelID, platform = "opencode") {
  const match = BENCHMARK_MODELS.find((model) => platform === "claude-code" ? model.claudeCodeModel === modelID : model.model === modelID)
  return match ? [...new Set([platform === "claude-code" ? match.claudeCodeModel : match.model, match.displayModel, match.key].filter(Boolean))] : [modelID]
}

export async function selectBenchmarkModel(options = {}) {
  const platform = options.platform ?? "opencode"
  const models = modelsForPlatform(platform)
  const defaultModel = platform === "claude-code" ? DEFAULT_CLAUDE_CODE_MODEL : DEFAULT_BENCHMARK_MODEL
  if (options.requestedModel !== undefined) return resolveBenchmarkModel(options.requestedModel, platform)
  if (!options.interactive) return defaultModel

  const input = options.input ?? process.stdin
  const output = options.output ?? process.stdout
  const rl = createInterface({ input, output })
  try {
    output.write("\nSelect benchmark model:\n")
    if (options.selectFromOpencodeModels) output.write("0. Select from OpenCode available models\n")
    for (const [index, model] of models.entries()) {
      const isDefault = platform === "claude-code" ? model.claudeCodeDefault : model.default
      const suffix = isDefault ? " (default)" : ""
      const modelID = platform === "claude-code" ? model.claudeCodeModel : model.model
      const displayModel = platform === "opencode" && model.displayModel ? `, model ${model.displayModel}` : ""
      output.write(`${index + 1}. ${model.label} [${modelID}${displayModel}]${suffix}\n`)
    }

    while (true) {
      const answer = (await rl.question(`Model [1-${models.length}, default 1]: `)).trim()
      if (!answer) return defaultModel
      if ((answer === "0" || answer.toLowerCase() === "opencode") && options.selectFromOpencodeModels) {
        const selected = await options.selectFromOpencodeModels({ question: (message) => rl.question(message) })
        if (selected) return selected
      }

      const selectedIndex = Number(answer)
      if (Number.isInteger(selectedIndex) && selectedIndex >= 1 && selectedIndex <= models.length) {
        return platform === "claude-code" ? models[selectedIndex - 1].claudeCodeModel : models[selectedIndex - 1].model
      }

      const resolved = resolveBenchmarkModel(answer, platform)
      if (resolved !== answer || models.some((model) => (platform === "claude-code" ? model.claudeCodeModel : model.model) === resolved)) return resolved
      output.write(`Unknown model selection: ${answer}\n`)
    }
  } finally {
    rl.close()
  }
}

export function modelsForPlatform(platform = "opencode") {
  return platform === "claude-code" ? BENCHMARK_MODELS.filter((model) => model.claudeCodeModel) : BENCHMARK_MODELS
}
