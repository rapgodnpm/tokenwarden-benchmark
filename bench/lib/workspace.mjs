import { chmod, copyFile, mkdir, rm, writeFile } from "node:fs/promises"
import { homedir } from "node:os"
import { dirname, join, relative, resolve } from "node:path"

export function repoRoot() {
  return resolve(new URL("../../", import.meta.url).pathname)
}

export function timestampID(date = new Date()) {
  return date.toISOString().replace(/[:.]/g, "-")
}

export function resolveResultsRoot(root, value, runID) {
  const resultsBase = resolve(root, "bench", "results")
  const requested = value === undefined ? join(resultsBase, runID) : resolve(root, String(value))
  const relativePath = relative(resultsBase, requested)

  if (!relativePath || relativePath === "." || relativePath.startsWith("..") || relativePath.split(/[\\/]/).includes("..")) {
    throw new Error(`refusing unsafe benchmark results path: ${requested}`)
  }

  return requested
}

export async function createRunWorkspace(baseDir, input) {
  const safe = `${input.plugin}-${input.task}-${input.run}`.replace(/[^a-zA-Z0-9_.-]/g, "-")
  const root = join(baseDir, safe)
  await rm(root, { recursive: true, force: true })
  const paths = {
    root,
    home: join(root, "home"),
    configRoot: join(root, "xdg-config"),
    configDir: join(root, "xdg-config", "opencode"),
    configPath: join(root, "xdg-config", "opencode", "opencode.json"),
    claudeConfigDir: join(root, "home", ".claude"),
    claudeSettingsPath: join(root, "home", ".claude", "settings.json"),
    claudeMcpPath: join(root, "tokenwarden.mcp.json"),
    claudePluginDir: join(root, "claude-plugins"),
    cache: join(root, "cache"),
    data: join(root, "data"),
    state: join(root, "state"),
    bin: join(root, "bin"),
    downloads: join(root, "downloads"),
    npmBin: join(root, "xdg-config", "opencode", "node_modules", ".bin"),
    tokenwardenHome: join(root, "tokenwarden"),
    repo: join(root, "repo")
  }
  await Promise.all([
    paths.root,
    paths.home,
    paths.configRoot,
    paths.configDir,
    paths.claudeConfigDir,
    paths.claudePluginDir,
    paths.cache,
    paths.data,
    paths.state,
    paths.bin,
    paths.downloads,
    paths.tokenwardenHome
  ].map((path) => mkdir(path, { recursive: true })))
  return paths
}

export function workspaceEnv(paths, baseEnv = process.env) {
  return {
    ...baseEnv,
    HOME: paths.home,
    XDG_CONFIG_HOME: paths.configRoot,
    XDG_CACHE_HOME: paths.cache,
    XDG_DATA_HOME: paths.data,
    XDG_STATE_HOME: paths.state,
    TOKENWARDEN_HOME: paths.tokenwardenHome,
    PATH: `${paths.bin}:${paths.npmBin}:${baseEnv.PATH ?? ""}`
  }
}

export function defaultOpencodeAuthPath(baseEnv = process.env) {
  const dataRoot = baseEnv.XDG_DATA_HOME || join(baseEnv.HOME || homedir(), ".local", "share")
  return join(dataRoot, "opencode", "auth.json")
}

export async function inheritOpencodeAuth(paths, baseEnv = process.env) {
  const source = defaultOpencodeAuthPath(baseEnv)
  const destination = join(paths.data, "opencode", "auth.json")

  try {
    await mkdir(dirname(destination), { recursive: true })
    await copyFile(source, destination)
    await chmod(destination, 0o600).catch(() => {})
    return { copied: true, source, destination }
  } catch (error) {
    if (error?.code === "ENOENT") {
      return { copied: false, source, destination, reason: "source auth file not found" }
    }
    throw error
  }
}

export async function writeJson(path, value) {
  await mkdir(dirname(path), { recursive: true })
  await writeFile(path, `${JSON.stringify(value, null, 2)}\n`, "utf8")
}
