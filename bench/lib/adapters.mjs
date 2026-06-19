import { readdir, readFile } from "node:fs/promises"
import { join } from "node:path"

export const ADAPTERS_DIR = new URL("../adapters/", import.meta.url)

export async function loadAdapter(id) {
  const adapterPath = new URL(`${id}.json`, ADAPTERS_DIR)
  const adapter = JSON.parse(await readFile(adapterPath, "utf8"))
  validateAdapter(adapter)
  return adapter
}

export async function loadAdapters(ids) {
  return Promise.all(ids.map((id) => loadAdapter(id)))
}

export async function listAdapterIDs() {
  const entries = await readdir(ADAPTERS_DIR)
  return entries.filter((entry) => entry.endsWith(".json")).map((entry) => entry.replace(/\.json$/, "")).sort()
}

export function validateAdapter(adapter) {
  if (!adapter || typeof adapter !== "object") throw new Error("adapter must be an object")
  if (typeof adapter.id !== "string" || !adapter.id) throw new Error("adapter.id is required")
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
