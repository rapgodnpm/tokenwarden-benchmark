I'll read the source and test files first to understand the current implementation and what needs to be refactored.





I can see the duplication: both `formatFirstName` and `formatLastName` use the exact same logic `value.trim().replace(/\s+/g, ' ')`. I'll refactor to extract this into a shared `normalizeName` helper.




Now I'll run the test to verify the refactoring works correctly:




**Refactoring Complete**

- **Refactored file:** bench-targets/refactor/src/name-formatters.mjs
- **Command run:** `node --test bench-targets/refactor/name-formatters.test.mjs`
- **Verification status:** ✅ passed (1 test passed, 0 failed)

**Changes made:**
- Added `normalizeName(value)` helper that performs `value.trim().replace(/\s+/g, ' ')`
- Both `formatFirstName` and `formatLastName` now delegate to `normalizeName` (preserving existing public exports)
- Removed duplicated whitespace normalization logic
