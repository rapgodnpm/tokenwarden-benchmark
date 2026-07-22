

The refactoring is complete and verified.

**Summary:**

| File | Action |
|------|--------|
| `bench-targets/refactor/src/name-formatters.mjs` | Refactored to introduce `normalizeName` helper |

**Changes:**
- Introduced a private `normalizeName` function that contains the duplicated whitespace normalization logic: `value.trim().replace(/\s+/g, ' ')`
- Both `formatFirstName` and `formatLastName` now delegate to this shared helper
- Existing public exports (`formatFirstName`, `formatLastName`) are preserved unchanged

**Verification:**
- Command: `node --test bench-targets/refactor/name-formatters.test.mjs`
- Result: **1 test passed**, 0 failures
