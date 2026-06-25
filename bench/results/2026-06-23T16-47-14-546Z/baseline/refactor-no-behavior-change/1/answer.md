The source has duplicated `value.trim().replace(/\s+/g, ' ')` in both functions. I'll create a shared helper and update both.







**Summary:**

**File modified:** `bench-targets/refactor/src/name-formatters.mjs`

**Change:** Introduced shared helper `normalizeName()` function and refactored both `formatFirstName` and `formatLastName` to use it, eliminating duplicated whitespace normalization logic. Public exports remain unchanged.

**Verification:** `node --test bench-targets/refactor/name-formatters.test.mjs` — **PASSED** (1 test, 0 failures)
