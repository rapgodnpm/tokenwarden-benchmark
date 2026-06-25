**Refactor complete**

- **File edited**: `bench-targets/refactor/src/name-formatters.mjs`
- **Change**: Introduced shared `normalizeName` helper, extracted common trimming/replacing logic from `formatFirstName` and `formatLastName`
- **Verification**: `node --test bench-targets/refactor/name-formatters.test.mjs` passed (1 test, 0 failed)

**Summary**: Behavior preserved, duplicate whitespace normalization removed.
