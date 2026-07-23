

Test passes. Refactor complete.

**File:** `/bench-targets/refactor/src/name-formatters.mjs`
- Added `normalizeName` helper extracting `trim().replace(/\s+/g, ' ')` logic
- Both `formatFirstName` and `formatLastName` now call `normalizeName`
- Public exports unchanged
- Test status: **pass**
