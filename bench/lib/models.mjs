import { readFileSync } from "node:fs"
import { createInterface } from "node:readline/promises"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const modelsPath = join(dirname(fileURLToPath(import.meta.url)), "..", "models.json")

export const BENCHMARK_MODELS = JSON.parse(readFileSync(modelsPath, "utf8"))

export const DEFAULT_BENCHMARK_MODEL = BENCHMARK_MODELS.find((model) => model.default)?.model ?? BENCHMARK_MODELS[0].model

export function resolveBenchmarkModel(value) {
  if (value === undefined || value === true || value === false || value === "") return DEFAULT_BENCHMARK_MODEL
  const requested = String(value).trim()
  const match = BENCHMARK_MODELS.find((model) => [model.key, model.model, model.displayModel, model.label].includes(requested))
  return match?.model ?? requested
}

export function benchmarkModelAliases(modelID) {
  const match = BENCHMARK_MODELS.find((model) => model.model === modelID)
  return match ? [match.model, match.displayModel, match.key].filter(Boolean) : [modelID]
}

export async function selectBenchmarkModel(options = {}) {
  if (options.requestedModel !== undefined) return resolveBenchmarkModel(options.requestedModel)
  if (!options.interactive) return DEFAULT_BENCHMARK_MODEL

  const input = options.input ?? process.stdin
  const output = options.output ?? process.stdout
  const rl = createInterface({ input, output })
  try {
    output.write("\nSelect benchmark model:\n")
    for (const [index, model] of BENCHMARK_MODELS.entries()) {
      const suffix = model.default ? " (default)" : ""
      const displayModel = model.displayModel ? `, model ${model.displayModel}` : ""
      output.write(`${index + 1}. ${model.label} [${model.model}${displayModel}]${suffix}\n`)
    }

    while (true) {
      const answer = (await rl.question(`Model [1-${BENCHMARK_MODELS.length}, default 1]: `)).trim()
      if (!answer) return DEFAULT_BENCHMARK_MODEL

      const selectedIndex = Number(answer)
      if (Number.isInteger(selectedIndex) && selectedIndex >= 1 && selectedIndex <= BENCHMARK_MODELS.length) {
        return BENCHMARK_MODELS[selectedIndex - 1].model
      }

      const resolved = resolveBenchmarkModel(answer)
      if (resolved !== answer || BENCHMARK_MODELS.some((model) => model.model === resolved)) return resolved
      output.write(`Unknown model selection: ${answer}\n`)
    }
  } finally {
    rl.close()
  }
}
