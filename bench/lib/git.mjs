import { mkdir } from "node:fs/promises"
import { dirname } from "node:path"
import { DEFAULT_CLONE_TIMEOUT_MS, DEFAULT_SETUP_TIMEOUT_MS, DEFAULT_UTILITY_TIMEOUT_MS } from "./config.mjs"
import { runCommand } from "./process.mjs"

export async function cloneRepo(repoURL, repoPath, options = {}) {
  const timeoutMs = options.timeoutMs ?? DEFAULT_CLONE_TIMEOUT_MS
  await mkdir(dirname(repoPath), { recursive: true })
  if (options.commit) {
    let result = await runCommand("git", ["init", repoPath], { env: options.env, timeoutMs })
    if (result.code !== 0) return result
    result = await runCommand("git", ["remote", "add", "origin", repoURL], { cwd: repoPath, env: options.env, timeoutMs })
    if (result.code !== 0) return result
    result = await runCommand("git", ["fetch", "--depth", "1", "origin", options.commit], { cwd: repoPath, env: options.env, timeoutMs, killProcessGroup: true })
    if (result.code !== 0) return result
    return runCommand("git", ["checkout", "--detach", "FETCH_HEAD"], { cwd: repoPath, env: options.env, timeoutMs })
  }

  const args = ["clone", "--depth", "1"]
  if (options.branch) args.push("--branch", options.branch)
  args.push(repoURL, repoPath)
  return runCommand("git", args, { env: options.env, timeoutMs, killProcessGroup: true })
}

export async function currentCommit(cwd, env) {
  const result = await runCommand("git", ["rev-parse", "HEAD"], { cwd, env, timeoutMs: DEFAULT_UTILITY_TIMEOUT_MS })
  return result.code === 0 ? result.stdout.trim() : undefined
}

export async function changedFiles(cwd, env) {
  const result = await runCommand("git", ["status", "--short"], { cwd, env, timeoutMs: DEFAULT_UTILITY_TIMEOUT_MS })
  if (result.code !== 0) return []
  return result.stdout.split(/\r?\n/).map((line) => line.slice(3).trim()).filter(Boolean)
}

export async function runSetupCommands(commands, cwd, env, variables = {}, options = {}) {
  const results = []
  for (const item of commands ?? []) {
    const command = typeof item === "string" ? item : item.command
    const timeoutMs = typeof item === "string" ? options.timeoutMs ?? DEFAULT_SETUP_TIMEOUT_MS : item.timeoutMs ?? options.timeoutMs ?? DEFAULT_SETUP_TIMEOUT_MS
    results.push(await runCommand(expandVariables(command, variables), [], { cwd, env, shell: true, timeoutMs, killProcessGroup: true }))
    if (results.at(-1).code !== 0) break
  }
  return results
}

function expandVariables(command, variables) {
  let expanded = command
  for (const [key, value] of Object.entries(variables)) {
    expanded = expanded.replaceAll(`{${key}}`, shellQuote(String(value)))
  }
  return expanded
}

function shellQuote(value) {
  return `'${value.replaceAll("'", "'\\''")}'`
}
