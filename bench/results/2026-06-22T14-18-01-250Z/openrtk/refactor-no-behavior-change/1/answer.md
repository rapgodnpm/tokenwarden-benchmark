I'll read the source file and test file first to understand the duplicated whitespace normalization logic.





I can see the duplication clearly - both functions have identical whitespace normalization logic `value.trim().replace(/\s+/g, ' ')`. I'll refactor by introducing a shared `normalizeName` helper.













**Refactoring completed successfully:**

**Changes made to `bench-targets/refactor/src/name-formatters.mjs`:**
- Introduced `export function normalizeName(value)` helper that encapsulates the shared whitespace normalization logic `value.trim().replace(/\s+/g, ' ')`
- Modified `formatFirstName` and `formatLastName` to call `normalizeName` instead of duplicating the logic
- Kept all existing public exports (`formatFirstName`, `formatLastName`, and new `normalizeName`)

**Verification:**
```bash
node --test bench-targets/refactor/name-formatters.test.mjs
```
✅ **Test passed** (1 test, 0 failed) - behavior unchanged

**Result:** Eliminated duplicated whitespace normalization logic while preserving all existing functionality.
