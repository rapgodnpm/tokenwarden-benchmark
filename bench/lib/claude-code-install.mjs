import { access, mkdir, readFile } from "node:fs/promises"
import { join, resolve } from "node:path"
import { cloneRepo, currentCommit } from "./git.mjs"
import { installAdapterDependencies } from "./install.mjs"
import { runCommand } from "./process.mjs"

export async function installClaudeCodeAdapter(adapter, workspace, options = {}) {
  const actions = []
  const pluginDirs = []
  let version

  if (adapter.integration === "none") return { actions, pluginDirs }

  if (adapter.integration === "local-plugin") {
    const pluginDir = resolve(options.env?.[adapter.pathEnv] || join(options.repoRoot, adapter.defaultPath))
    actions.push({ type: "local-plugin", package: adapter.packageName, path: pluginDir })
    if (!options.dryRun || options.reusePrepared) {
      const packageJson = JSON.parse(await readFile(join(pluginDir, "package.json"), "utf8"))
      if (packageJson.name !== adapter.packageName) throw new Error(`${pluginDir} is not ${adapter.packageName}`)
      await access(join(pluginDir, "dist", "src", "cli.js"))
      version = packageJson.version
    }
    pluginDirs.push(pluginDir)
    return { actions, pluginDirs, version }
  }

  if (adapter.integration === "npm-plugin") {
    const pluginDir = join(workspace.claudePluginDir, "node_modules", adapter.pluginPackage)
    actions.push({ type: "npm-plugin", package: adapter.npmPackage })
    if (!options.dryRun) {
      const result = await runCommand("npm", ["install", "--prefix", workspace.claudePluginDir, adapter.npmPackage], {
        env: options.env,
        timeoutMs: options.timeoutMs,
        killProcessGroup: true
      })
      if (result.code !== 0) throw new Error(commandFailureMessage(`npm install failed for ${adapter.id}`, result))
    }
    if (!options.dryRun || options.reusePrepared) version = JSON.parse(await readFile(join(pluginDir, "package.json"), "utf8")).version
    pluginDirs.push(pluginDir)
    return { actions, pluginDirs, version }
  }

  if (adapter.integration === "git-plugin") {
    const pluginDir = join(workspace.claudePluginDir, adapter.id)
    actions.push({ type: "git-plugin", repo: adapter.repo, ref: adapter.ref })
    if (!options.dryRun) {
      await mkdir(workspace.claudePluginDir, { recursive: true })
      const result = await cloneRepo(adapter.repo, pluginDir, { branch: adapter.ref, env: options.env, timeoutMs: options.timeoutMs })
      if (result.code !== 0) throw new Error(commandFailureMessage(`git clone failed for ${adapter.id}`, result))
      version = adapter.ref ?? await currentCommit(pluginDir, options.env)
    }
    if (options.reusePrepared) version = adapter.ref ?? await currentCommit(pluginDir, options.env)
    pluginDirs.push(pluginDir)
    return { actions, pluginDirs, version }
  }

  if (adapter.integration === "rtk-hook") {
    actions.push(...await installAdapterDependencies(adapter, workspace, {
      dryRun: options.dryRun,
      env: options.env,
      repoRoot: options.repoRoot,
      timeoutMs: options.timeoutMs,
      utilityTimeoutMs: options.utilityTimeoutMs
    }))
    if (!options.dryRun) {
      const result = await runCommand("rtk", ["init", "-g"], { env: options.env, timeoutMs: options.timeoutMs })
      if (result.code !== 0) throw new Error(commandFailureMessage("rtk init failed", result))
      const versionResult = await runCommand("rtk", ["--version"], { env: options.env, timeoutMs: options.utilityTimeoutMs })
      version = versionResult.stdout.trim() || adapter.binaries?.[0]?.tag
    }
    if (options.reusePrepared) {
      const versionResult = await runCommand("rtk", ["--version"], { env: options.env, timeoutMs: options.utilityTimeoutMs })
      version = versionResult.stdout.trim() || adapter.binaries?.[0]?.tag
    }
    return { actions, pluginDirs, version }
  }

  throw new Error(`${adapter.id}: unsupported Claude Code integration ${adapter.integration}`)
}

function commandFailureMessage(message, result) {
  const status = result.timedOut ? `timed out after ${result.durationMs}ms` : result.signal ? `signal=${result.signal}` : `exit=${result.code}`
  const output = result.stderr || result.stdout
  return `${message} (${status})${output ? `\n${output}` : ""}`
}
