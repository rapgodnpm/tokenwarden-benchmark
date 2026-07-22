

## Summary

**Refactoring completed:**

- **File edited:** `bench-targets/refactor/src/name-formatters.mjs`
- **Change:** Introduced shared `normalizeName` helper function that extracts the duplicated whitespace normalization logic (`value.trim().replace(/\s+/g, ' ')`). Both `formatFirstName` and `formatLastName` now delegate to this helper while maintaining their original public exports.

**Verification:**
```bash
node --test bench-targets/refactor/name-formatters.test.mjs
```

**Result:** ✅ All tests pass (1 test, 1 pass, 0 fail)
