**File refactored:**
- `bench-targets/refactor/src/name-formatters.mjs`

**Change:** Created `normalizeName` helper function extracting the duplicated `.trim().replace(/\s+/g, ' ')` logic; kept existing public exports (`formatFirstName`, `formatLastName`).

**Commands run:**
- `node --test bench-targets/refactor/name-formatters.test.mjs`

**Verification status:** ✅ All 1 test passed
