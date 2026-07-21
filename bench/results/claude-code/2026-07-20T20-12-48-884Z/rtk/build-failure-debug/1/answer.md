

## Summary

**Fix Applied:** Renamed `entries` to `entryPoints` in the config file.

**File Changed:**
- `/private/tmp/tokenwarden-bench/claude-code/2026-07-20T20-12-48-884Z/rtk-build-failure-debug-1/repo/bench-targets/build-failure/src/config.mjs`

**Verification Status:** ✅ **PASSED**

```
node bench-targets/build-failure/build.mjs
build ok
```

The `build.mjs` expects `entryPoints` as the configuration property name, while the original `config.mjs` was exporting `entries`. This mismatch caused the build to fail with "build config entryPoints must be an array". The fix preserves the existing entry path (`src/index.js`) and output directory (`dist`) semantics.
