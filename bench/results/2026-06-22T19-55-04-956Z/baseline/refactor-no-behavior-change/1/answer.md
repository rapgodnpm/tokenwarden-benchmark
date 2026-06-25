I can see the duplication - both functions use `.trim().replace(/\s+/g, ' ')`. I'll extract this into a shared `normalizeName` helper.







**Refactoring complete:**
- Introduced `normalizeName(value)` helper function: `value.trim().replace(/\s+/g, ' ')`
- Refactored `formatFirstName` and `formatLastName` to reuse `normalizeName`
- Tests pass (1/1 passed)

**Files changed:** `bench-targets/refactor/src/name-formatters.mjs`
