I can see both functions have identical `value.trim().replace(/\s+/g, ' ')` logic. I'll refactor by extracting it into a shared `normalizeName` helper.







**Summary:**

- **Change:** Extracted duplicated `value.trim().replace(/\s+/g, ' ')` logic into shared `normalizeName` helper at `bench-targets/refactor/src/name-formatters.mjs:1-3`. Both `formatFirstName` and `formatLastName` now delegate to it. Public exports unchanged.

- **Command run:** `node --test bench-targets/refactor/name-formatters.test.mjs`

- **Verification status:** ✅ Pass (1 test, 0 failures)
