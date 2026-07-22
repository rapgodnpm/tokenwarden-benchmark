

All 80 tests now pass.

## Summary

**Root cause:** The `add` function in `bench-targets/large-log/src/math.mjs:2` was performing subtraction (`a - b`) instead of addition (`a + b`).

**Fix applied:**
- **File:** `bench-targets/large-log/src/math.mjs`
- **Change:** Line 2, changed `return a - b` to `return a + b`

**Verification:** `node --test bench-targets/large-log/math.test.mjs` - 80 tests pass, 0 failures.
