The source file has duplicated `.trim().replace(/\s+/g, ' ')` logic in both `formatFirstName` and `formatLastName`. I'll refactor by extracting this pattern to a shared `normalizeName` helper.










Refactored `/bench-targets/refactor/src/name-formatters.mjs` to extract duplicate `.trim().replace(/\s+/g, ' ')` logic into a shared `normalizeName` helper. Public exports (`formatFirstName`, `formatLastName`) unchanged. Tests pass.
