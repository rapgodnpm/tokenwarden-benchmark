I can see the duplicated logic: both `formatFirstName` and `formatLastName` use `value.trim().replace(/\s+/g, ' ')`. I'll extract this into a shared `normalizeName` helper.







**Refactoring complete:**

**File modified:** `bench-targets/refactor/src/name-formatters.mjs`

**Change:** Extracted shared `normalizeName` helper function that handles `value.trim().replace(/\s+/g, ' ')` and used it in both `formatFirstName` and `formatLastName`.

**Verification status:** ✅ Pass (1 test passed, 0 failed)

**Test command:** `node --test bench-targets/refactor/name-formatters.test.mjs`
