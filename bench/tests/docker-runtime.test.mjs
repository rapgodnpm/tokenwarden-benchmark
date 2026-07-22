import test from "node:test"
import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import { assertDockerRuntime } from "../lib/runtime.mjs"

test("the complete test suite runs inside Docker", () => {
  assert.equal(process.env.TOKENWARDEN_BENCH_IN_DOCKER, "1")
  assert.doesNotThrow(() => assertDockerRuntime())
  assert.throws(() => assertDockerRuntime({}), /must run through Docker/)
})

test("all public test and benchmark scripts route through the Docker launcher", async () => {
  const packageJson = JSON.parse(await readFile(new URL("../../package.json", import.meta.url), "utf8"))
  for (const [name, command] of Object.entries(packageJson.scripts)) {
    if (name === "test" || name.startsWith("bench:")) {
      assert.match(command, /^node scripts\/docker-run\.mjs /, `${name} bypasses Docker`)
    }
  }
})

test("Docker services keep source read-only and model execution on an internal network", async () => {
  const compose = await readFile(new URL("../../compose.yaml", import.meta.url), "utf8")
  const dockerfile = await readFile(new URL("../../Dockerfile", import.meta.url), "utf8")
  assert.match(compose, /source: \$\{PROJECT_ROOT\}[\s\S]*read_only: true/)
  assert.match(compose, /source: \$\{RESULTS_STAGE\}[\s\S]*target: \/workspace\/bench\/results/)
  assert.match(compose, /benchmark:\n    internal: true/)
  assert.match(compose, /cap_drop:\n      - ALL/)
  assert.doesNotMatch(compose, /docker\.sock/)
  assert.match(dockerfile, /FROM debian:trixie-slim/)
  assert.match(dockerfile, /NODE_VERSION=22\.16\.0/)
  assert.match(dockerfile, /CLAUDE_CODE_VERSION=2\.1\.212/)
  assert.match(dockerfile, /OPENCODE_VERSION=1\.18\.4/)
})
