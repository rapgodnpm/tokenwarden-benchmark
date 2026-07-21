

**Verification status: All tests pass.**

**Changes made:**
- **File:** `/private/tmp/tokenwarden-bench/claude-code/2026-07-20T20-12-48-884Z/baseline-refactor-no-behavior-change-3/repo/bench-targets/refactor/src/name-formatters.mjs`

**Refactoring:**
- Introduced shared helper `normalizeName(value)` containing `value.trim().replace(/\s+/g, ' ')`
- `formatFirstName` and `formatLastName` now delegate to `normalizeName`
- Public exports (`formatFirstName`, `formatLastName`) unchanged

**Verification:**
```
node --test bench-targets/refactor/name-formatters.test.mjs
# Result: 1 pass, 0 fail
```
