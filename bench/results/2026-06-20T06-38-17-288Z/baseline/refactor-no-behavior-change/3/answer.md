The source file has duplicated `.trim().replace(/\s+/g, ' ')` logic in both `formatFirstName` and `formatLastName`. I'll refactor it by extracting this as a shared `normalizeName` helper.







**Refactoring complete.**

**Changes made:**
- File: `bench-targets/refactor/src/name-formatters.mjs`
- Extracted duplicated `.trim().replace(/\s+/g, ' ')` into a small private function `normalizeName`
- Both `formatFirstName` and `formatLastName` now call `normalizeName`
- Public exports (`formatFirstName`, `formatLastName`) unchanged

**Verification:**
```
node --test bench-targets/refactor/name-formatters.test.mjs
# 1 test passed
```

**Status:** ✓ Passed
