

## Summary

**Diagnosis:** The `add` function in `bench-targets/large-log/src/math.mjs` had a typo - it returned `a - b` instead of `a + b`.

**Fix:** Changed line 2 from `return a - b` to `return a + b`.

**Verification Status:** All 80 tests pass ✅

**Commands run:**
1. `node --test bench-targets/large-log/math.test.mjs 2>&1 | head -30` — confirmed failing tests (80 failures)
2. `node --test bench-targets/large-log/math.test.mjs 2>&1` — verified all 80 tests passing after fix
