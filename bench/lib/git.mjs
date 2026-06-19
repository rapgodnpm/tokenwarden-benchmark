import { mkdir } from "node:fs/promises"
import { dirname } from "node:path"
import { runCommand } from "./process.mjs"

export async function cloneRepo(repoURL, repoPath, options = {}) {
  await mkdir(dirname(repoPath), { recursive: true })
  const args = ["clone", "--depth", "1"]
  if (options.branch) args.push("--branch", options.branch)
  args.push(repoURL, repoPath)
  return runCommand("git", args, { env: options.env })
}

export async function runSetupCommands(commands, cwd, env, variables = {}) {
  const results = []
  for (const command of commands ?? []) {
    results.push(await runCommand(expandVariables(command, variables), [], { cwd, env, shell: true }))
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
