I can see the duplication - both functions use `value.trim().replace(/\s+/g, ' ')`. I'll extract this into a shared `normalizeName` helper.







Refactor complete. Summary:

- **File**: `bench-targets/refactor/src/name-formatters.mjs`
- **Change**: Extracted duplicated whitespace normalization into `normalizeName(value)` helper; both `formatFirstName` and `formatLastName` now call it
- **Public exports**: Unchanged (`formatFirstName`, `formatLastName`)
- **Verification**: `node --test` - **1 pass, 0 fail**
