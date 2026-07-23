

## Summary

**Problem:** The config file exported `entries` but build.mjs expected `entryPoints`.

**Fix:** Renamed `entries` to `entryPoints` in `src/config.mjs` (line 2).

**Verification:** `node bench-targets/build-failure/build.mjs` outputs `build ok` ✓

**Files changed:**
- `/work/tokenwarden-build-failure-debug-2/repo/bench-targets/build-failure/src/config.mjs`
