I can see both `formatFirstName` and `formatLastName` have identical logic. Let me refactor by extracting the whitespace normalization into a shared `normalizeName` helper.







**Verification Status: PASSED** - All tests pass (1 pass, 0 fail)

**Refactoring Summary:**
- **File modified:** `bench-targets/refactor/src/name-formatters.mjs`
- **Changes:**
  1. Introduced private helper `normalizeName(value)` that extracts the duplicated `trim().replace(/\s+/g, ' ')` logic
  2. Both `formatFirstName` and `formatLastName` now delegate to `normalizeName`
  3. Public exports (`formatFirstName`, `formatLastName`) remain unchanged
- **Behavior:** Identical to original (tests pass)
