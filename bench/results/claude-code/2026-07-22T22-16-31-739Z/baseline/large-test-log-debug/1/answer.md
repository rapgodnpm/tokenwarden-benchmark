

## Summary

**Root Cause:** The `add` function in `bench-targets/large-log/src/math.mjs` incorrectly implemented subtraction (`a - b`) instead of addition (`a + b`).

**Fix Applied:**
- **File:** `bench-targets/large-log/src/math.mjs`
- **Change:** Line 2 - `return a - b` → `return a + b`

**Verification Status:** ✅ All 80 tests pass

```
# tests 80
# suites 0
# pass 80
# fail 0
```
