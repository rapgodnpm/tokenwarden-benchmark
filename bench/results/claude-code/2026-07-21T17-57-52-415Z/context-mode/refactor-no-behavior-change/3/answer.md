

Refactored `bench-targets/refactor/src/name-formatters.mjs`:

**Changes:**
- Extracted the duplicated `.trim().replace(/\s+/g, ' ')` logic into a shared `normalizeName()` helper function
- Both `formatFirstName` and `formatLastName` now delegate to `normalizeName`
- Kept existing public exports unchanged

**Verification:**
```
node --test bench-targets/refactor/name-formatters.test.mjs
```
Result: **PASS** (1 test, 1 pass)
