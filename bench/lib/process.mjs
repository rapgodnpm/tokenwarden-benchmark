import { spawn } from "node:child_process"

export async function runCommand(command, args = [], options = {}) {
  const startedAt = Date.now()
  return new Promise((resolve) => {
    let timedOut = false
    const child = spawn(command, args, {
      cwd: options.cwd,
      env: options.env,
      detached: Boolean(options.killProcessGroup),
      shell: options.shell ?? false,
      stdio: ["ignore", "pipe", "pipe"]
    })
    let killTimer
    const timer = options.timeoutMs ? setTimeout(() => {
      timedOut = true
      killChild(child, options.killProcessGroup, "SIGTERM")
      killTimer = setTimeout(() => killChild(child, options.killProcessGroup, "SIGKILL"), options.killGraceMs ?? 5000)
    }, options.timeoutMs) : undefined
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
      if (timer) clearTimeout(timer)
      if (killTimer) clearTimeout(killTimer)
      resolve({ command, args, code, signal, timedOut, stdout, stderr, durationMs: Date.now() - startedAt })
    })
  })
}

export function commandLine(command, args = []) {
  return [command, ...args.map((arg) => (/[\s"'\\]/.test(arg) ? JSON.stringify(arg) : arg))].join(" ")
}

function killChild(child, killProcessGroup, signal) {
  try {
    if (killProcessGroup && child.pid) process.kill(-child.pid, signal)
    else child.kill(signal)
  } catch {
    try {
      child.kill(signal)
    } catch {
      // The process already exited.
    }
  }
}
