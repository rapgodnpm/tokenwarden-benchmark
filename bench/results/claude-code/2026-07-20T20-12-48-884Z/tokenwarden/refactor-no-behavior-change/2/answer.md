

**Refactor Complete**

**File modified:**
- `/private/tmp/tokenwarden-bench/claude-code/2026-07-20T20-12-48-884Z/tokenwarden-refactor-no-behavior-change-2/repo/bench-targets/refactor/src/name-formatters.mjs`

**Changes:**
- Introduced `normalizeName(value)` helper function that encapsulates `value.trim().replace(/\s+/g, ' ')`
- Both `formatFirstName` and `formatLastName` now delegate to `normalizeName()`
- Public exports remain unchanged: `formatFirstName` and `formatLastName`

**Verification status:** ✅ Pass
```
node --test bench-targets/refactor/name-formatters.test.mjs
```
All tests pass (1 pass, 0 fail).
