

The refactoring is complete and verified.

## Summary

**File changed:** `/work/baseline-refactor-no-behavior-change-1/repo/bench-targets/refactor/src/name-formatters.mjs`

**Change:** Introduced a shared `normalizeName` helper function to eliminate the duplicated `value.trim().replace(/\s+/g, ' ')` logic in both `formatFirstName` and `formatLastName`.

**Public exports preserved:** `normalizeName`, `formatFirstName`, `formatLastName`

**Verification:** ✅ Test passed (1 test, 1 pass, 0 fail)

```
node --test bench-targets/refactor/name-formatters.test.mjs
```
