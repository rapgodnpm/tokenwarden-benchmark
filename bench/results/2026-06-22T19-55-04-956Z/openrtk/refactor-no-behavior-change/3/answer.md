Both functions duplicate the whitespace normalization logic. I'll extract it into a shared `normalizeName` helper:







Refactoring complete. Introduced `normalizeName` helper to eliminate duplicated `.trim().replace(/\s+/g, ' ')` logic from `formatFirstName` and `formatLastName`. Both functions now share the same behavior while preserving the two public exports.

**Files modified:** `bench-targets/refactor/src/name-formatters.mjs`

**Verification:** `node --test bench-targets/refactor/name-formatters.test.mjs` - 1 test passed
