Now I understand the issue. Both `formatFirstName` and `formatLastName` have identical whitespace normalization logic. I'll refactor this by introducing a shared `normalizeName` helper.










Refactored `/private/tmp/tokenwarden-bench/2026-06-22T19-55-04-956Z/tokenwarden-refactor-no-behavior-change-1/repo/bench-targets/refactor/src/name-formatters.mjs`:
- Extracted duplicated whitespace normalization logic to a new `normalizeName` helper (line 1-3)
- Both `formatFirstName` and `formatLastName` now delegate to `normalizeName` (lines 5-11)
- No public exports changed; tests pass with `node --test bench-targets/refactor/name-formatters.test.mjs`
