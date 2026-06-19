import { spawn } from "node:child_process"

export async function runCommand(command, args = [], options = {}) {
  const startedAt = Date.now()
  return new Promise((resolve) => {
    const child = spawn(command, args, {
      cwd: options.cwd,
      env: options.env,
      shell: options.shell ?? false,
      stdio: ["ignore", "pipe", "pipe"]
    })
    let stdout = ""
    let stderr = ""
    child.stdout.on("data", (chunk) => {
      stdout += chunk.toString()
    })
    child.stderr.on("data", (chunk) => {
      stderr += chunk.toString()
    })
    child.on("error", (error) => {
      stderr += `${error.stack ?? error.message}\n`
    })
    child.on("close", (code, signal) => {
      resolve({ command, args, code, signal, stdout, stderr, durationMs: Date.now() - startedAt })
    })
  })
}

export function commandLine(command, args = []) {
  return [command, ...args.map((arg) => (/[\s"'\\]/.test(arg) ? JSON.stringify(arg) : arg))].join(" ")
}
