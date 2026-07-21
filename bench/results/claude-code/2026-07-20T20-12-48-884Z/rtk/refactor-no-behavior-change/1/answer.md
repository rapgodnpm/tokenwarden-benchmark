

## Summary

**File refactored**: `/repo/bench-targets/refactor/src/name-formatters.mjs`

**Changes made**:
- Introduced a shared `normalizeName` helper function that contains the duplicated whitespace normalization logic: `value.trim().replace(/\s+/g, ' ')`
- Both `formatFirstName` and `formatLastName` now delegate to `normalizeName`
- Existing public exports (`formatFirstName` and `formatLastName`) are preserved unchanged

**Verification**:
```bash
node --test bench-targets/refactor/name-formatters.test.mjs
```

**Result**: ✅ All 1 test passed, confirming no behavioral change.
