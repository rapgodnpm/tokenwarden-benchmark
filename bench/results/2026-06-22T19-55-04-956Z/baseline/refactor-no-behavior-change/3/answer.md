I'll start by reading the source file and test file to understand the current implementation.





I can see the duplicated logic: both functions use `.trim().replace(/\s+/g, ' ')`. I'll refactor to introduce a shared `normalizeName` helper.







**Refactor complete and verified.**

**Changes made:**
- Introduced `normalizeName` helper that encapsulates `value.trim().replace(/\s+/g, ' ')`
- Both `formatFirstName` and `formatLastName` now call `normalizeName`
- Original public exports unchanged

**Verification:** `node --test bench-targets/refactor/name-formatters.test.mjs` passed all tests (1 test, 0 failures).
