**Summary:**
- **File updated:** `bench-targets/refactor/src/name-formatters.mjs`
- **Change:** Introduced `normalizeName` helper function with the shared whitespace normalization logic, both `formatFirstName` and `formatLastName` now delegate to it
- **Public exports preserved:** `formatFirstName` and `formatLastName` remain exported

**Verification:**
```bash
node --test bench-targets/refactor/name-formatters.test.mjs
```
**Status:** Pass (1 pass, 0 fail)
