

**Refactoring Complete**

**File modified:** `bench-targets/refactor/src/name-formatters.mjs`

**Changes:**
1. Introduced shared helper `normalizeName(value)` that contains the whitespace normalization logic
2. Both `formatFirstName` and `formatLastName` now delegate to `normalizeName`

**Verification status:** ✅ All tests pass

```
# tests 1
# pass 1
# fail 0
```
