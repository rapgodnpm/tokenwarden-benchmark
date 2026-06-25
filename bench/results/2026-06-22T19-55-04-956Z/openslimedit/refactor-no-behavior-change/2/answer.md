I can see the duplicated logic. Both functions use `value.trim().replace(/\s+/g, ' ')`. I'll refactor this by creating a shared `normalizeName` helper:







**Verification: PASS**

1 file changed:
  - `bench-targets/refactor/src/name-formatters.mjs`

Added `normalizeName` helper function and refactored both `formatFirstName` and `formatLastName` to use it, eliminating the duplicated `value.trim().replace(/\s+/g, ' ')` logic while preserving public exports and behavior.
