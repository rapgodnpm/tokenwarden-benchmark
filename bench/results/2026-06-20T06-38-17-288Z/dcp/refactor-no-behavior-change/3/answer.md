I can see the duplicate `value.trim().replace(/\s+/g, ' ')` logic in both functions. I'll create a shared helper and refactor:







**Refactor complete**

**File modified:** `bench-targets/refactor/src/name-formatters.mjs`

**Change:** Introduced `normalizeName` helper to eliminate duplicated `value.trim().replace(/\s+/g, ' ')` logic in `formatFirstName` and `formatLastName`. Kept both functions exported as before.

**Verification:** `node --test bench-targets/refactor/name-formatters.test.mjs`
**Status:** ✅ pass (1 test, 0 failures)
