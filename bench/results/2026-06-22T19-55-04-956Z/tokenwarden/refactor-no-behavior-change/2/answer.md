I'll start by reading both the source file and test file to understand the duplicated whitespace normalization logic.





I can see the issue: both `formatFirstName` and `formatLastName` have duplicated `.trim().replace(/\s+/g, ' ')` logic. I'll create a `normalizeName` helper function to extract this logic.




Now let me verify the refactored code passes the tests:




**Verification Status: ✅ PASS**

**Changes:**
- **File**: `bench-targets/refactor/src/name-formatters.mjs`
- **Action**: Introduced shared `normalizeName` helper function that extracts duplicated `.trim().replace(/\s+/g, ' ')` logic
- **Public exports preserved**: `formatFirstName` and `formatLastName` still exported, now delegate to `normalizeName`
- **Smallest change**: 3 lines added, no existing functionality altered
- **Test result**: 1/1 passed
