

## Summary

**Problem:** `config.mjs` exported `entries` but `build.mjs` expects `entryPoints`.

**Fix Applied:**
- **File:** `bench-targets/build-failure/src/config.mjs`
- **Change:** Renamed `entries` to `entryPoints`

**Verification:**
- **Command:** `node bench-targets/build-failure/build.mjs`
- **Status:** `build ok` ✅
