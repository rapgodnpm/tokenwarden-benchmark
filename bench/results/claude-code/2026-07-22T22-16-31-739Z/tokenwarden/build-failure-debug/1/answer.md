

## Summary

**Issue:** Build configuration failure due to property name mismatch.

**Root Cause:** `config.mjs` exported `entries` but `build.mjs` expected `entryPoints`.

**Fix Applied:** Changed `entries` to `entryPoints` in `config.mjs`.

**Verification Status:** ✓ Build passes - outputs "build ok"

---

### Files Changed
- `/work/tokenwarden-build-failure-debug-1/repo/bench-targets/build-failure/src/config.mjs`

**Command run:** `node bench-targets/build-failure/build.mjs`
