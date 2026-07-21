

## Summary

**Root Cause:** The `add` function in `src/math.mjs` was implementing subtraction (`a - b`) instead of addition (`a + b`).

**Fix Applied:**
- **File:** `bench-targets/large-log/src/math.mjs` (line 2)
- **Change:** `return a - b` → `return a + b`

**Verification Status:** ✅ All 80 tests pass (`node --test bench-targets/large-log/math.test.mjs`)
