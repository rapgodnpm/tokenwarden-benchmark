

## Summary

**File refactored:** `bench-targets/refactor/src/name-formatters.mjs`

**Changes made:**
1. Introduced shared helper `normalizeName(value)` that encapsulates the duplicated logic `value.trim().replace(/\s+/g, ' ')`
2. Updated `formatFirstName` and `formatLastName` to delegate to `normalizeName`
3. Both original public exports (`formatFirstName`, `formatLastName`) remain unchanged

**Command run:**
```bash
node --test bench-targets/refactor/name-formatters.test.mjs
```

**Verification status:** ✅ **PASSED** - All 1 test passed with no failures.
