

Refactoring complete.

**File modified:** `bench-targets/refactor/src/name-formatters.mjs`

**Change:** Introduced shared `normalizeName` helper that both `formatFirstName` and `formatLastName` now use instead of duplicating the whitespace normalization logic.

**Verification status:** ✅ Passed - `node --test bench-targets/refactor/name-formatters.test.mjs` (1 test passed, 0 failed)
