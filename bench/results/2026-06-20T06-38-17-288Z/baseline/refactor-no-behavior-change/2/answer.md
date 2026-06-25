The both functions `formatFirstName` and `formatLastName` have identical implementations. I'll refactor to extract the shared whitespace normalization logic into a single `normalizeName` helper.







✅ **Refactoring complete and verified**

- **File**: `bench-targets/refactor/src/name-formatters.mjs`
- **Change**: Introduced shared `normalizeName` helper (internal function) that contains the duplicated `value.trim().replace(/\s+/g, ' ')` logic. Both exported functions now call `normalizeName`.
- **Verification**: `node --test bench-targets/refactor/name-formatters.test.mjs` - PASSED (1 pass, 0 fail)
