

## Refactor Complete

**File modified:** `bench-targets/refactor/src/name-formatters.mjs`

**Change:** Introduced a shared `normalizeName` helper function that contains the duplicated whitespace normalization logic (`value.trim().replace(/\s+/g, ' ')`). Both `formatFirstName` and `formatLastName` now delegate to this helper.

**Public exports preserved:** `formatFirstName` and `formatLastName` remain exported with identical behavior.

**Verification:** All tests pass ✓

```
node --test bench-targets/refactor/name-formatters.test.mjs
```
