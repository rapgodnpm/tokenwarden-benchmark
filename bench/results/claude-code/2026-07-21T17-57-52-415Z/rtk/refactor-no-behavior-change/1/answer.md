

## Refactor Summary

**File modified:** `bench-targets/refactor/src/name-formatters.mjs`

**Changes made:**
1. Introduced shared helper function `normalizeName(value)` that encapsulates the duplicated whitespace normalization logic (`value.trim().replace(/\s+/g, ' ')`)
2. Refactored `formatFirstName` and `formatLastName` to use `normalizeName` internally
3. Preserved existing public exports (`formatFirstName` and `formatLastName`)

**Verification status:** ✅ PASS

```
tests 1, pass 1, fail 0
```
