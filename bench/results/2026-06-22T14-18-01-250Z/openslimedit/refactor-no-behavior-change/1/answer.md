I can see both `formatFirstName` and `formatLastName` duplicate the same whitespace normalization logic `value.trim().replace(/\s+/g, ' ')`. I'll refactor by creating a shared `normalizeName` helper.







Refactored `bench-targets/refactor/src/name-formatters.mjs` by:
- Added shared `normalizeName` helper function with the duplicated `value.trim().replace(/\s+/g, ' ')` logic
- Modified `formatFirstName` and `formatLastName` to call `normalizeName`
- Verified with `node --test bench-targets/refactor/name-formatters.test.mjs` → **1 test passed**

Exact paths: `/private/tmp/tokenwarden-bench/2026-06-22T14-18-01-250Z/openslimedit-refactor-no-behavior-change-1/repo/bench-targets/refactor/src/name-formatters.mjs`
