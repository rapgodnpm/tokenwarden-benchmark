

Refactor complete and verified.

**Summary:**
- **File modified:** `bench-targets/refactor/src/name-formatters.mjs`
- **Change:** Introduced shared helper `normalizeName(value)` that extracts the duplicated whitespace normalization logic (`value.trim().replace(/\s+/g, ' ')`)
- **Public exports preserved:** `formatFirstName` and `formatLastName` now delegate to `normalizeName`
- **Verification status:** ✅ Pass (1 test passed)
