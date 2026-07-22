

## Summary

**Root cause:** `bench-targets/typecheck-flood/typecheck.mjs` contained a `for` loop that repeated the same error message 60 times.

**Fix:** Removed the loop from `typecheck.mjs` (lines 6-8), replacing it with a single error emission.

**File changed:**
- `bench-targets/typecheck-flood/typecheck.mjs`

**Verification status:** PASS - Now outputs a single error message instead of 60 repetitions.
