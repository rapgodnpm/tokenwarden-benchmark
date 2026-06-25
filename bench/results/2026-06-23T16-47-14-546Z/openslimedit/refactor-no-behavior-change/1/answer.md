I see the duplication. Both functions use identical whitespace normalization logic. I'll create a shared `normalizeName` helper and refactor accordingly.













**Verification Status:** ✅ PASS

**Changes:**
- **File:** `bench-targets/refactor/src/name-formatters.mjs`
- **Before:** Both `formatFirstName` and `formatLastName` had duplicated `value.trim().replace(/\s+/g, ' ')` logic
- **After:** Introduced shared `normalizeName` helper function (lines 1-3), factorized both formatters to call it
- **Public exports:** `formatFirstName` and `formatLastName` remain unchanged

**Command run:**
```bash
node --test bench-targets/refactor/name-formatters.test.mjs
```

**Result:** 1 test passed — behavior unchanged.
