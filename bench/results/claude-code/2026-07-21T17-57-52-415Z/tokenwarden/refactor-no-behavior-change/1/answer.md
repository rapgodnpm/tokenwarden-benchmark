

## Summary

**Refactored file:** `/private/tmp/tokenwarden-bench/claude-code/2026-07-21T17-57-52-415Z/tokenwarden-refactor-no-behavior-change-1/repo/bench-targets/refactor/src/name-formatters.mjs`

**Change made:**
- Introduced a new internal helper function `normalizeName(value)` that contains the duplicated `value.trim().replace(/\s+/g, ' ')` logic
- Both `formatFirstName` and `formatLastName` now call `normalizeName(value)` instead of duplicating the logic
- Kept the same public exports (`formatFirstName` and `formatLastName`)

**Verification status:** ✅ **PASSED**
- Command: `node --test bench-targets/refactor/name-formatters.test.mjs`
- Result: 1 test passed, 0 failed
