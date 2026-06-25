The source file has duplicated logic in lines 2 and 6 (`value.trim().replace(/\s+/g, ' ')`). I'll extract this into a shared helper `normalizeName` and refactor both functions to use it.







**Summary:**

- **File changed:** `bench-targets/refactor/src/name-formatters.mjs`
- **Change:** Extracted duplicated `value.trim().replace(/\s+/g, ' ')` logic into a shared `normalizeName` helper function at module scope; both `formatFirstName` and `formatLastName` now delegate to it
- **Public exports preserved:** `formatFirstName` and `formatLastName` (private helper added)
- **Command run:** `node --test bench-targets/refactor/name-formatters.test.mjs`
- **Verification status:** ✅ **PASS** (1 test passed, 0 failed)
