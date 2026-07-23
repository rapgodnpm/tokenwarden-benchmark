import test from "node:test"
import assert from "node:assert/strict"
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { installClaudeCodeAdapter } from "../lib/claude-code-install.mjs"

test("local TokenWarden adapter resolves a built local plugin without installing globally", async () => {
  const root = await mkdtemp(join(tmpdir(), "tokenwarden-claude-adapter-test-"))
  try {
    const pluginDir = join(root, "plugin")
    await mkdir(join(pluginDir, "dist", "src"), { recursive: true })
    await writeFile(join(pluginDir, "package.json"), JSON.stringify({ name: "@tokenwarden/claude-code", version: "1.2.0" }), "utf8")
    await writeFile(join(pluginDir, "dist", "src", "cli.js"), "", "utf8")

    const result = await installClaudeCodeAdapter({
      id: "tokenwarden",
      integration: "local-plugin",
      packageName: "@tokenwarden/claude-code",
      pathEnv: "TOKENWARDEN_CLAUDE_PACKAGE",
      defaultPath: "../token-optimizer/packages/claude-code"
    }, {}, {
      env: { TOKENWARDEN_CLAUDE_PACKAGE: pluginDir },
      repoRoot: root
    })

    assert.deepEqual(result.pluginDirs, [pluginDir])
    assert.equal(result.version, "1.2.0")
    assert.equal(result.actions[0].type, "local-plugin")

    const reused = await installClaudeCodeAdapter({
      id: "tokenwarden",
      integration: "local-plugin",
      packageName: "@tokenwarden/claude-code",
      pathEnv: "TOKENWARDEN_CLAUDE_PACKAGE",
      defaultPath: "../token-optimizer/packages/claude-code"
    }, {}, {
      dryRun: true,
      reusePrepared: true,
      env: { TOKENWARDEN_CLAUDE_PACKAGE: pluginDir },
      repoRoot: root
    })
    assert.equal(reused.version, "1.2.0")
  } finally {
    await rm(root, { recursive: true, force: true })
  }
})

test("RTK installs only its hook without an interactive settings prompt", async () => {
  const calls = []
  const result = await installClaudeCodeAdapter({
    id: "rtk",
    integration: "rtk-hook",
    binaries: [{ tag: "v0.43.0" }]
  }, {}, {
    env: {},
    installDependencies: async () => [],
    commandRunner: async (command, args) => {
      calls.push({ command, args })
      return { code: 0, stdout: args[0] === "--version" ? "rtk 0.43.0\n" : "", stderr: "" }
    }
  })

  assert.deepEqual(calls, [
    { command: "rtk", args: ["init", "-g", "--hook-only", "--auto-patch"] },
    { command: "rtk", args: ["--version"] }
  ])
  assert.equal(result.version, "rtk 0.43.0")
})
