

## Refactor Complete

**File modified:** `/private/tmp/tokenwarden-bench/claude-code/2026-07-21T17-57-52-415Z/rtk-refactor-no-behavior-change-3/repo/bench-targets/refactor/src/name-formatters.mjs`

**Changes made:**
- Introduced `normalizeName` helper function (lines 1-3) that extracts the shared whitespace normalization logic: `value.trim().replace(/\s+/g, ' ')`
- Both `formatFirstName` and `formatLastName` now delegate to `normalizeName`
- Public exports preserved exactly as before

**Verification:**
```bash
node --test bench-targets/refactor/name-formatters.test.mjs
```

**Result:** ✅ All 1 test passed (0 failures). The refactored code preserves the original behavior.
