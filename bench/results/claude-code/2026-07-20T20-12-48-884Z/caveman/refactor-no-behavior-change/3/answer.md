

Extracted `value.trim().replace(/\s+/g, ' ')` into `normalizeName` helper. Both `formatFirstName` and `formatLastName` now call it. Tests pass.

- File: `bench-targets/refactor/src/name-formatters.mjs`
- Command: `node --test bench-targets/refactor/name-formatters.test.mjs`
- Status: pass
