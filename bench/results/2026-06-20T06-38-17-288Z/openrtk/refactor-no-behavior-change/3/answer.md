I can see the issue: both `formatFirstName` and `formatLastName` duplicate the same whitespace normalization pattern `value.trim().replace(/\s+/g, ' ')`. I'll refactor to extract this into a single shared helper function.







**Refactoring completed:**

- File: `bench-targets/refactor/src/name-formatters.mjs`
- Created shared `normalizeName` helper function with the duplicated `value.trim().replace(/\s+/g, ' ')` logic
- Refactored `formatFirstName` and `formatLastName` to use `normalizeName` instead of duplicating the logic
- All existing public exports (`formatFirstName`, `formatLastName`) remain unchanged
- Tests pass: `bench-targets/refactor/name-formatters.test.mjs` (1 test passed, 0 failed)
