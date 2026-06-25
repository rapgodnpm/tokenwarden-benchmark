I'll start by reading the source and test files to understand the duplicated logic.









I see the issue - both `formatFirstName` and `formatLastName` have identical `.trim().replace(/\s+/g, ' ')` logic. I'll refactor by extracting this into a shared `normalizeName` helper while keeping the existing public exports unchanged.







Refactoring complete.

**Changes:**
- File: `bench-targets/refactor/src/name-formatters.mjs`
- Extracted duplicated whitespace normalization into shared `normalizeName` helper function
- Both `formatFirstName` and `formatLastName` now call `normalizeName`
- Public exports unchanged (`formatFirstName`, `formatLastName`)

**Verification:**
```bash
node --test bench-targets/refactor/name-formatters.test.mjs
```

**Status:** ✅ Pass (1 test passed)
