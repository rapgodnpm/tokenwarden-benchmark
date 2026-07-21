

All 80 tests pass now.

## Summary

**Root cause:** A single character typo in `bench-targets/large-log/src/math.mjs` line 2.

**Diagnosis:** The `add` function was implementing subtraction (`a - b`) instead of addition (`a + b`), causing all 80 test cases to fail because they expected `index + 2` but got `index - 2`.

**Fix:** Changed `-` to `+` in the return statement.

**Files changed:**
- `bench-targets/large-log/src/math.mjs` (line 2: `return a - b` → `return a + b`)

**Verification status:** ✅ **PASSED** — All 80 tests pass (80 passed, 0 failed).
