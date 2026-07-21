

## Summary

**Problem**: The `config.mjs` file exported `entries` but `build.mjs` expected `entryPoints`.

**Fix**: Added `entryPoints` as an alias property in `config.mjs` to match the expected schema while preserving the original `entries` property.

**File edited**: `/private/tmp/tokenwarden-bench/claude-code/2026-07-20T20-12-48-884Z/rtk-build-failure-debug-3/repo/bench-targets/build-failure/src/config.mjs`

**Verification**: 
```bash
node bench-targets/build-failure/build.mjs
# Output: build ok
```

Build status: ✅ Fixed
