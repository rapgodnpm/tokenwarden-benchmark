The source file has duplicated `.trim().replace(/\s+/g, ' ')` logic in both `formatFirstName` and `formatLastName`. I'll extract this into a shared `normalizeName` helper.







Refactored `bench-targets/refactor/src/name-formatters.mjs`:
- Extracted duplicated whitespace normalization into shared `normalizeName` helper
- Both `formatFirstName` and `formatLastName` now use `normalizeName`
- Public exports unchanged (`formatFirstName`, `formatLastName`)
- Test passed: 1/1 pass
