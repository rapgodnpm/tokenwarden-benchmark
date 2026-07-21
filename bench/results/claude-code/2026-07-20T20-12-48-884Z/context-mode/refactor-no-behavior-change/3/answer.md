

**Verification Status: PASSED**

**Summary:**
- **File refactored:** `bench-targets/refactor/src/name-formatters.mjs`
- **Change:** Extracted shared whitespace normalization into `normalizeName(value)` helper, which both `formatFirstName` and `formatLastName` now call
- **Public exports preserved:** `formatFirstName` and `formatLastName` remain exported with identical behavior
- **Test result:** `node --test` passed all tests (1 pass, 0 fail)
