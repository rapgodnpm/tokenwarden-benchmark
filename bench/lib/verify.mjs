import { runCommand } from "./process.mjs"

export async function runVerifyCommands(commands, cwd, env) {
  const results = []
  for (const command of commands ?? []) {
    const result = await runCommand(command, [], { cwd, env, shell: true })
    results.push(result)
    if (result.code !== 0) break
  }
  return {
    passed: results.every((result) => result.code === 0),
    results
  }
}
