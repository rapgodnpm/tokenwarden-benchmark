I'll start by reading both the source file and the test file to understand the duplicated logic and what needs to be preserved.





I can see the duplicated logic. Both `formatFirstName` and `formatLastName` have the same implementation: `value.trim().replace(/\s+/g, ' ')`. I'll refactor by extracting a shared `normalizeName` helper.




Now let's verify with the tests:




- **File edited**: `bench-targets/refactor/src/name-formatters.mjs`
- **Refactor introduced**: Added small shared helper `normalizeName` function to eliminate duplicated `value.trim().replace(/\s+/g, ' ')` logic from both `formatFirstName` and `formatLastName`
- **Public exports preserved**: `formatFirstName` and `formatLastName` still exported unchanged
- **Verification**: `node --test bench-targets/refactor/name-formatters.test.mjs` - **PASSED** (1 test passed, 0 failed)
