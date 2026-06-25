I see the duplication: both `formatFirstName` and `formatLastName` use `value.trim().replace(/\s+/g, ' ')`. I'll create a shared `normalizeName` helper:







**Verification: PASSED** (1 test passed, 0 failed)

**Refactoring Summary:**
- **File:** `bench-targets/refactor/src/name-formatters.mjs`
- **Change:** Extracted `trim().replace(/\s+/g, ' ')` logic into shared `normalizeName` helper
- **Kept public exports:** `formatFirstName`, `formatLastName` unchanged in behavior
