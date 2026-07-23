

## Summary

**Refactored file:** `/work/baseline-refactor-no-behavior-change-3/repo/bench-targets/refactor/src/name-formatters.mjs`

**Changes made:**
- Introduced a private shared helper function `normalizeName(value)` that extracts the duplicated whitespace normalization logic: `value.trim().replace(/\s+/g, ' ')`
- Both `formatFirstName` and `formatLastName` now delegate to `normalizeName`
- Public exports (`formatFirstName`, `formatLastName`) remain unchanged

**Verification status:** ✅ Passed
- Command: `node --test bench-targets/refactor/name-formatters.test.mjs`
- Result: 1 test passed, 0 failed
