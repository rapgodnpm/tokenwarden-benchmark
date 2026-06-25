The source has duplicated `value.trim().replace(/\s+/g, ' ')` logic in both functions. I'll introduce a shared `normalizeName` helper.







**File refactored:**
- `bench-targets/refactor/src/name-formatters.mjs`

**Changes:**
- Added exported `normalizeName` helper function (extracts the duplicated logic)
- Refactored `formatFirstName` and `formatLastName` to call `normalizeName` instead of duplicating logic
- Maintains exact same public exports (`formatFirstName`, `formatLastName`)

**Verification:**
```
node --test bench-targets/refactor/name-formatters.test.mjs
```
✅ 1 test passed (behavior unchanged)
