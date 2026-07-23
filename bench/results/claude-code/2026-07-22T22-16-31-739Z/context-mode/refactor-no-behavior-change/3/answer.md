

Refactoring complete. Here's the summary:

## Changes Made

**File:** `bench-targets/refactor/src/name-formatters.mjs`

Introduced a shared `normalizeName` helper function to eliminate duplicated whitespace normalization logic. The function:
1. Trims leading/trailing whitespace
2. Collapses multiple internal spaces to single spaces

Both `formatFirstName` and `formatLastName` now delegate to this helper.

## Verification Status

```
# tests 1
# pass 1
# fail 0
```

All tests pass — behavior is preserved.
