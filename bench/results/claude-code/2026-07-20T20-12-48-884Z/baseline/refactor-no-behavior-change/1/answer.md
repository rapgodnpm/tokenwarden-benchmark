

**Refactoring Complete**

**File modified:** `/private/tmp/tokenwarden-bench/claude-code/2026-07-20T20-12-48-884Z/baseline-refactor-no-behavior-change-1/repo/bench-targets/refactor/src/name-formatters.mjs`

**Changes:**
- Introduced shared helper `normalizeName(value)` that handles whitespace normalization: `value.trim().replace(/\s+/g, ' ')`
- Refactored `formatFirstName` to call `normalizeName(value)` instead of duplicating the logic
- Refactored `formatLastName` to call `normalizeName(value)` instead of duplicating the logic
- Kept existing public exports (`formatFirstName`, `formatLastName`) intact

**Verification status:** ✅ PASSED

The test `node --test bench-targets/refactor/name-formatters.test.mjs` ran successfully with 1 test passing (0 failing), confirming the refactored code preserves the original behavior.
