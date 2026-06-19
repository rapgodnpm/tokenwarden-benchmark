import { readFile, mkdir, writeFile } from "node:fs/promises"
import { homedir } from "node:os"
import { dirname, join } from "node:path"
import { DEFAULT_BENCHMARK_MODEL } from "./models.mjs"

export { DEFAULT_BENCHMARK_MODEL }
export const DEFAULT_BENCHMARK_RUNS = 3

export function createOpenCodeConfig(adapter, options = {}) {
  const model = options.model ?? DEFAULT_BENCHMARK_MODEL
  const config = {
    $schema: "https://opencode.ai/config.json",
    lsp: false,
    model,
    small_model: model,
    plugin: adapter.plugins
  }
  if (options.provider && Object.keys(options.provider).length) config.provider = options.provider
  return config
}

export async function writeOpenCodeConfig(configPath, adapter, options = {}) {
  const config = createOpenCodeConfig(adapter, options)
  await mkdir(dirname(configPath), { recursive: true })
  await writeFile(configPath, `${JSON.stringify(config, null, 2)}\n`, "utf8")
  return config
}

export async function loadLocalProviderConfig(baseEnv = process.env) {
  for (const configPath of localConfigPaths(baseEnv)) {
    try {
      const parsed = JSON.parse(stripJsonComments(await readFile(configPath, "utf8")))
      return parsed.provider && typeof parsed.provider === "object" ? parsed.provider : {}
    } catch (error) {
      if (error?.code === "ENOENT") continue
      throw new Error(`failed to read local opencode provider config from ${configPath}: ${error.message}`)
    }
  }
  return {}
}

export function providerPackages(providerConfig, providerID) {
  const provider = providerConfig?.[providerID]
  return [...new Set([provider?.npm].filter(Boolean))]
}

export function configuredProviderModelIDs(providerConfig) {
  const models = []
  for (const [providerID, provider] of Object.entries(providerConfig ?? {})) {
    for (const modelID of Object.keys(provider.models ?? {})) models.push(`${providerID}/${modelID}`)
  }
  return models
}

function localConfigPaths(baseEnv) {
  const configRoot = baseEnv.XDG_CONFIG_HOME || join(baseEnv.HOME || homedir(), ".config")
  const opencodeRoot = join(configRoot, "opencode")
  return [join(opencodeRoot, "opencode.json"), join(opencodeRoot, "opencode.jsonc")]
}

function stripJsonComments(value) {
  let result = ""
  let inString = false
  let inLineComment = false
  let inBlockComment = false
  let escaped = false

  for (let index = 0; index < value.length; index += 1) {
    const char = value[index]
    const next = value[index + 1]

    if (inLineComment) {
      if (char === "\n") {
        inLineComment = false
        result += char
      }
      continue
    }

    if (inBlockComment) {
      if (char === "*" && next === "/") {
        inBlockComment = false
        index += 1
      }
      continue
    }

    if (!inString && char === "/" && next === "/") {
      inLineComment = true
      index += 1
      continue
    }

    if (!inString && char === "/" && next === "*") {
      inBlockComment = true
      index += 1
      continue
    }

    result += char

    if (char === '"' && !escaped) inString = !inString
    escaped = inString && char === "\\" && !escaped
    if (char !== "\\") escaped = false
  }

  return result
}
