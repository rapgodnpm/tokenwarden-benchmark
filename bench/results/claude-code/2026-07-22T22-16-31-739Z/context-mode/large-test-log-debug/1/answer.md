

## Summary

**Root cause:** `bench-targets/large-log/src/math.mjs:2` returned `a - b` instead of `a + b`.

**Fix:** Changed `return a - b` to `return a + b` in `src/math.mjs`.

**Verification status:** All 80 tests pass (`node --test bench-targets/large-log/math.test.mjs` exits with 0 failures).
