I see the duplicated logic: both `formatFirstName` and `formatLastName` use the same `value.trim().replace(/\s+/g, ' ')` pattern. I'll extract this into a shared `normalizeName` helper.







**Summary:**

- **File changed:** `bench-targets/refactor/src/name-formatters.mjs`
- **Changes:** Refactored duplicated `value.trim().replace(/\s+/g, ' ')` logic into a shared `normalizeName` helper function (keeps existing public exports: `formatFirstName`, `formatLastName`)
- **Command run:** `node --test bench-targets/refactor/name-formatters.test.mjs`
- **Verification status:** ✅ Passed (1 test, 1 pass, 0 fail)
