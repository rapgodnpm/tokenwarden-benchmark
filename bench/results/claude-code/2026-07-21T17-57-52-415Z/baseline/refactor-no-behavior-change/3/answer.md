

**Verification Status: ✅ PASS**

**Summary of changes:**
- **File modified:** `bench-targets/refactor/src/name-formatters.mjs`
- **Refactoring:** Extracted duplicated whitespace normalization logic into a new shared helper function `normalizeName(value)` that returns `value.trim().replace(/\s+/g, ' ')`
- **Existing exports preserved:** `formatFirstName` and `formatLastName` still export as before, now delegating to `normalizeName`
