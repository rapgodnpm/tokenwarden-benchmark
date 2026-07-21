import { readdir, readFile } from "node:fs/promises"
import { join } from "node:path"

export const ADAPTERS_DIR = new URL("../adapters/", import.meta.url)
const CLAUDE_CODE_INTEGRATIONS = new Set(["none", "local-plugin", "npm-plugin", "rtk-hook", "git-plugin"])

export async function loadAdapter(id, platform = "opencode") {
  const adapterPath = new URL(`${platform}/${id}.json`, ADAPTERS_DIR)
  const adapter = JSON.parse(await readFile(adapterPath, "utf8"))
  validateAdapter(adapter, platform)
  return adapter
}

export async function loadAdapters(ids, platform = "opencode") {
  return Promise.all(ids.map((id) => loadAdapter(id, platform)))
}

export async function listAdapterIDs(platform = "opencode") {
  const entries = await readdir(new URL(`${platform}/`, ADAPTERS_DIR))
  return entries.filter((entry) => entry.endsWith(".json")).map((entry) => entry.replace(/\.json$/, "")).sort()
}

export function validateAdapter(adapter, platform = "opencode") {
  if (!adapter || typeof adapter !== "object") throw new Error("adapter must be an object")
  if (typeof adapter.id !== "string" || !adapter.id) throw new Error("adapter.id is required")
  if (platform === "claude-code") {
    if (typeof adapter.integration !== "string" || !adapter.integration) throw new Error(`${adapter.id}: integration is required`)
    if (!CLAUDE_CODE_INTEGRATIONS.has(adapter.integration)) throw new Error(`${adapter.id}: unsupported Claude Code integration ${adapter.integration}`)
    return adapter
  }
  if (!Array.isArray(adapter.plugins)) throw new Error(`${adapter.id}: plugins must be an array`)
  if (adapter.plugins.length > 1) throw new Error(`${adapter.id}: benchmark adapters may enable at most one plugin`)
  for (const plugin of adapter.plugins) {
    if (typeof plugin !== "string" || !plugin) throw new Error(`${adapter.id}: plugin entries must be non-empty strings`)
  }
  if (adapter.npmPackages !== undefined && !Array.isArray(adapter.npmPackages)) {
    throw new Error(`${adapter.id}: npmPackages must be an array when provided`)
  }
  return adapter
}

export function adapterInstallPackages(adapter, repoRoot) {
  const packages = [...(adapter.npmPackages ?? [])]
  if (adapter.localPackage) packages.unshift(join(repoRoot, adapter.localPackage))
  return [...new Set(packages)]
}
