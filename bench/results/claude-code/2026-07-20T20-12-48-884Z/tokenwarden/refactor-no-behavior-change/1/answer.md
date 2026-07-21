

## Summary

**File Refactored:** `bench-targets/refactor/src/name-formatters.mjs`

**Changes Made:**
1. Introduced a shared `normalizeName` helper function that contains the whitespace normalization logic
2. Refactored `formatFirstName` and `formatLastName` to use `normalizeName` instead of duplicating the logic
3. Maintained existing public exports (`formatFirstName` and `formatLastName`)

**Verification:**
- Command run: `node --test bench-targets/refactor/name-formatters.test.mjs`
- Result: ✅ **1 test passed**, 0 failures

The refactoring eliminates the duplicated `value.trim().replace(/\s+/g, ' ')` logic while preserving all existing behavior.
