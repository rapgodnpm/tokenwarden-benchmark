The issue is clear: `config.mjs` exports `entries`/`outDir` but `build.mjs` expects `entryPoints`/`outDir`.







Fixed `src/config.mjs` - changed `entries` to `entryPoints` to match the expected property name in the build validation.

**File path:** `/private/tmp/tokenwarden-bench/2026-06-23T16-47-14-546Z/tokenwarden-build-failure-debug-2/repo/bench-targets/build-failure/src/config.mjs`

**Command run:** `node bench-targets/build-failure/build.mjs`

**Verification status:** passed (output: `build ok`)
