

## Refactor Complete

**File edited:** `bench-targets/refactor/src/name-formatters.mjs`

**Change:** Extracted the duplicated whitespace normalization (`value.trim().replace(/\s+/g, ' ')`) into a shared `normalizeName` helper function. Both `formatFirstName` and `formatLastName` now delegate to this helper.

**Public exports preserved:** `formatFirstName`, `formatLastName`

**Verification:** Test passes ✓
```
node --test bench-targets/refactor/name-formatters.test.mjs
# tests 1, pass 1, fail 0
```
