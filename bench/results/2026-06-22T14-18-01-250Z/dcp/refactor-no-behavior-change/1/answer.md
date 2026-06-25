I'll analyze the source and test files first to understand the duplicated whitespace normalization logic, then refactor it.









Let me search for the files in the repository:












Now I understand the issue. The `formatFirstName` and `formatLastName` functions both use the identical whitespace normalization logic `value.trim().replace(/\s+/g, ' ')`. I'll refactor by extracting this into a shared `normalizeName` helper:




Now verifying with the test:




**Refactoring complete and verified.**

**Changes made:**
- File: `bench-targets/refactor/src/name-formatters.mjs`
- Extracted the duplicated `value.trim().replace(/\s+/g, ' ')` logic into a shared `normalizeName` helper function
- Both `formatFirstName` and `formatLastName` now call `normalizeName` instead of duplicating the logic

**Verification status:**
- `node --test bench-targets/refactor/name-formatters.test.mjs` passed (1 test, 0 failed)
- Behavior preserved with identical test results
