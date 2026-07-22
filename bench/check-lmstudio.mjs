#!/usr/bin/env node
import { parseArgs } from "./lib/args.mjs"
import { DEFAULT_UTILITY_TIMEOUT_MS } from "./lib/config.mjs"
import { DEFAULT_LMSTUDIO_BASE_URL, formatLmStudioPreflightFailure, lmStudioModelIDs } from "./lib/claude-code.mjs"
import { benchmarkModelAliases, resolveBenchmarkModel } from "./lib/models.mjs"
import { assertDockerRuntime } from "./lib/runtime.mjs"

assertDockerRuntime()

const args = parseArgs(process.argv.slice(2))
const platform = String(args.platform ?? "claude-code")
if (!["claude-code", "opencode"].includes(platform)) throw new Error(`unsupported benchmark platform: ${platform}`)

const requestedModel = args.model
const model = resolveBenchmarkModel(requestedModel, platform)
const aliases = benchmarkModelAliases(model, platform)
const baseURL = String(args.lmstudioBaseUrl ?? process.env.LMSTUDIO_BASE_URL ?? DEFAULT_LMSTUDIO_BASE_URL)
const availableModels = await lmStudioModelIDs(baseURL, DEFAULT_UTILITY_TIMEOUT_MS)
const availableModel = aliases.find((alias) => availableModels.includes(alias))

if (!availableModel) throw new Error(formatLmStudioPreflightFailure(model, baseURL))
process.stdout.write(`[lmstudio-preflight] Docker reached ${baseURL}; model=${availableModel}\n`)
