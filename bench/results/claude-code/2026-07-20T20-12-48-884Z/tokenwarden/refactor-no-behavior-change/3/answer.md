

The refactor is complete.

## Summary

**File modified:** `bench-targets/refactor/src/name-formatters.mjs`

**Changes:**
- Introduced a shared helper function `normalizeName` that contains the duplicated whitespace normalization logic
- Both `formatFirstName` and `formatLastName` now delegate to `normalizeName` instead of duplicating the logic
- Existing public exports (`formatFirstName`, `formatLastName`) are preserved

**Verification status:** ✅ Pass

All tests pass with `node --test bench-targets/refactor/name-formatters.test.mjs`, confirming no behavior change.
