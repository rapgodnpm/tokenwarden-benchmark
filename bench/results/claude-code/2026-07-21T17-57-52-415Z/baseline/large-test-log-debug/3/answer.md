

All 80 tests pass.

## Summary

**Root Cause:** In `bench-targets/large-log/src/math.mjs`, line 2, the `add` function used subtraction instead of addition.

**Fix Applied:**
- **File:** `bench-targets/large-log/src/math.mjs`
- **Change:** `return a - b` → `return a + b`

**Verification:** `node --test bench-targets/large-log/math.test.mjs` - 80/80 tests passing.
