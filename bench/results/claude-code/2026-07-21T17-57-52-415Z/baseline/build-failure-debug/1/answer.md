

## Summary

**Root cause:** The config file exported `entries` but the build script expected `entryPoints`.

**File changed:** `/private/tmp/tokenwarden-bench/claude-code/2026-07-21T17-57-52-415Z/baseline-build-failure-debug-1/repo/bench-targets/build-failure/src/config.mjs`

**Change:** Renamed `entries` to `entryPoints` in the exported config object.

**Verification:** `node build.mjs` outputs `build ok` ✓
