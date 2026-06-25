The duplicate whitespace normalization logic is in `value.trim().replace(/\s+/g, ' ')` in both functions. I'll refactor to extract this into a shared `normalizeName` helper.







**Verification Status: PASSED**

- Refactored `/bench-targets/refactor/src/name-formatters.mjs` to extract shared `normalizeName` helper
- Introduced one small shared helper function to eliminate duplicated whitespace normalization logic
- Kept existing public exports (`formatFirstName`, `formatLastName`)
- Ran `node --test bench-targets/refactor/name-formatters.test.mjs` - all tests passed
