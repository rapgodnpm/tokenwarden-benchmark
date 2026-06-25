Refactored `bench-targets/refactor/src/name-formatters.mjs`:

**Change:** Introduced `normalizeName` helper function sharing the duplicated `.trim().replace(/\s+/g, ' ')` logic, kept existing `formatFirstName` and `formatLastName` exports.

**Verification:** `node --test bench-targets/refactor/name-formatters.test.mjs` passed (1 test, 0 failures).
