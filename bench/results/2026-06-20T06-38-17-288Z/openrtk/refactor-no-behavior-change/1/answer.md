I can see the duplication: both `formatFirstName` and `formatLastName` use identical `value.trim().replace(/\s+/g, ' ')` logic. I'll extract this into a shared `normalizeName` helper.







Refactor complete. Created `normalizeName` helper function in `bench-targets/refactor/src/name-formatters.mjs`, refactored both `formatFirstName` and `formatLastName` to use it.

Verification status: **PASS** (`node --test bench-targets/refactor/name-formatters.test.mjs`) - all tests pass.
