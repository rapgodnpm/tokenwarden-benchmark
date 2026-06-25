import { DEFAULT_VERIFY_TIMEOUT_MS } from "./config.mjs"
import { runCommand } from "./process.mjs"

export async function runVerifyCommands(commands, cwd, env, options = {}) {
  const results = []
  for (const item of commands ?? []) {
    const command = typeof item === "string" ? item : item.command
    const timeoutMs = typeof item === "string" ? options.timeoutMs ?? DEFAULT_VERIFY_TIMEOUT_MS : item.timeoutMs ?? options.timeoutMs ?? DEFAULT_VERIFY_TIMEOUT_MS
    const result = await runCommand(command, [], { cwd, env, shell: true, timeoutMs, killProcessGroup: true })
    results.push(result)
    if (result.code !== 0) break
  }
  return {
    passed: results.every((result) => result.code === 0),
    results
  }
}
