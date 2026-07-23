

**Refactor done.**
- `bench-targets/refactor/src/name-formatters.mjs`: Duplicated whitespace normalization moved to shared `normalizeName` helper. Both `formatFirstName` and `formatLastName` now call `normalizeName`.
- `bench-targets/refactor/name-formatters.test.mjs` passes (1 test, 0 failures).
- Public API unchanged: `formatFirstName`, `formatLastName` still exported.
