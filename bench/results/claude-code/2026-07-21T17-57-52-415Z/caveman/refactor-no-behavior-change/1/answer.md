

Done.

File modified: `bench-targets/refactor/src/name-formatters.mjs`

Change: Added `normalizeName` helper that encapsulates `trim().replace(/\s+/g, ' ')`. Both `formatFirstName` and `formatLastName` now call it instead of duplicating logic.

Verification: `node --test bench-targets/refactor/name-formatters.test.mjs` passed (1 pass, 0 fail).
