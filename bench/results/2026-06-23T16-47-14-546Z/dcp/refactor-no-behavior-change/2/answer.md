I see the duplicated whitespace normalization logic. Both `formatFirstName` and `formatLastName` use `value.trim().replace(/\s+/g, ' ')`. I'll introduce a shared helper `normalizeName` and refactor both functions.







**Summary:**

- **File refactored:** `bench-targets/refactor/src/name-formatters.mjs`
- **Change:** Introduced shared `normalizeName` helper function to eliminate duplicated `value.trim().replace(/\s+/g, ' ')` logic in both `formatFirstName` and `formatLastName`.
- **Public exports:** Unchanged (`formatFirstName`, `formatLastName`)
- **Test command:** `node --test /private/tmp/tokenwarden-bench/2026-06-23T16-47-14-546Z/dcp-refactor-no-behavior-change-2/repo/bench-targets/refactor/name-formatters.test.mjs`
- **Verification status:** ✅ **PASSED** (1 pass, 0 fail)
