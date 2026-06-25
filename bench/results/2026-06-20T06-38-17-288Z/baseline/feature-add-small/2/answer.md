**Summary:**
- Added `titleCase()` helper function to `/private/tmp/tokenwarden-bench/2026-06-20T06-38-17-288Z/baseline-feature-add-small-2/repo/bench-targets/feature/src/formatTitle.mjs`
- Updated `formatTitle()` to handle `'title'` mode by calling `titleCase()`
- Test verified: `node --test` passed (1 test, 0 fail)
- Verification with manual test: `"hello benchmark world"` with mode `'title'` returns `"Hello Benchmark World"` (matches expected)
