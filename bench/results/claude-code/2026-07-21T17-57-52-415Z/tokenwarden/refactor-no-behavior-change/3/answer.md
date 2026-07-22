

## Summary

**Refactored file:** `bench-targets/refactor/src/name-formatters.mjs`

**Change:** Introduced a shared `normalizeName` helper function to eliminate duplicated whitespace normalization logic. Both `formatFirstName` and `formatLastName` now delegate to `normalizeName`.

**Commands run:**
```bash
node --test bench-targets/refactor/name-formatters.test.mjs
```

**Verification status:** ✅ All tests pass (1 pass, 0 fail)

**Public exports:** `formatFirstName`, `formatLastName` (unchanged)
