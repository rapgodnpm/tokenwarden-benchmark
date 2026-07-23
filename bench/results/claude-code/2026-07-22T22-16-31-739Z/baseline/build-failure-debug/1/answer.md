

The build configuration failure has been fixed.

**Summary:**
- **Issue:** `config.mjs` exported `entries` but `build.mjs` expected `entryPoints`
- **Fix:** Renamed `entries` to `entryPoints` in `/work/baseline-build-failure-debug-1/repo/bench-targets/build-failure/src/config.mjs`
- **Verification status:** ✅ Pass - `node bench-targets/build-failure/build.mjs` outputs "build ok"
