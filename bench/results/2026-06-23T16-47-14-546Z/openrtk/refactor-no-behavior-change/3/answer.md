**Refactor Complete**

**File modified:** `bench-targets/refactor/src/name-formatters.mjs`

**Changes:**
- Introduced `normalizeName(value)` helper that extracts shared whitespace normalization logic: `value.trim().replace(/\s+/g, ' ')`
- Refactored `formatFirstName` and `formatLastName` to call `normalizeName()`
- Existing public exports (`formatFirstName`, `formatLastName`) preserved

**Verification:**
```bash
node --test bench-targets/refactor/name-formatters.test.mjs
```
Result: **PASS** (1 test passed, 0 failed)
