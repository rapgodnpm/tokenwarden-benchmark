

## Summary

**Root Cause:** The `add` function in `math.mjs` was implemented incorrectly - it returned subtraction (`a - b`) instead of addition.

**Fix Applied:**
- **File:** `bench-targets/large-log/src/math.mjs`
- **Line:** 2
- **Change:** `return a - b` → `return a + b`

**Verification Status:** ✅ All 80 tests pass

```
# tests 80
# pass 80
# fail 0
```
