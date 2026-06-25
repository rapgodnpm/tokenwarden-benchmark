I'll read the source and test files first to understand the duplication and required changes.





I can see the duplication: both `formatFirstName` and `formatLastName` use `value.trim().replace(/\s+/g, ' ')`. I'll create a shared helper `normalizeName` and refactor both functions to use it, maintaining the same exports and behavior.




Now I'll run the tests to verify the refactoring maintains correct behavior:




Refactoring verified. Summary:

**Changes:**
- **File**: `bench-targets/refactor/src/name-formatters.mjs`
- Added private `normalizeName(value)` function that contains the duplicated `value.trim().replace(/\s+/g, ' ')` logic
- Refactored `formatFirstName` and `formatLastName` to call `normalizeName` instead of inline duplication
- Kept the exact same public exports (`formatFirstName`, `formatLastName`)

**Verification:** All tests pass (1 test, 0 failures)

**Command:** `node --test bench-targets/refactor/name-formatters.test.mjs`
