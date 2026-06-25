Refactored `/private/tmp/tokenwarden-bench/2026-06-23T16-47-14-546Z/tokenwarden-refactor-no-behavior-change-1/repo/bench-targets/refactor/src/name-formatters.mjs`:

**Changes:**
- Added shared `normalizeName(value)` helper function (private, no export)
- `formatFirstName` and `formatLastName` now delegate to `normalizeName`

**Commands run:**
```
node --test bench-targets/refactor/name-formatters.test.mjs
```

**Verification status:** PASS (1/1 tests passed)
