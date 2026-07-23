

**Fix Complete**

**Issue:** The config file exported `entries` and `outDir`, but `build.mjs` expected `entryPoints` and `outDir`.

**File changed:** `/work/baseline-build-failure-debug-2/repo/bench-targets/build-failure/src/config.mjs`

**Change:** Renamed `entries` to `entryPoints` to match the expected schema.

**Verification:**
```bash
node bench-targets/build-failure/build.mjs
```
**Result:** `build ok` (success)
