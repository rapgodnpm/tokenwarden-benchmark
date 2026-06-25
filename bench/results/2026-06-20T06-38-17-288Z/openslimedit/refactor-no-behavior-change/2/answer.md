I see the duplicated `.trim().replace(/\s+/g, ' ')` logic in both `formatFirstName` and `formatLastName`. Let me refactor to extract this into a shared `normalizeName` helper.







**Refactoring complete.**

**Changes:**
- Added shared helper `normalizeName` in `bench-targets/refactor/src/name-formatters.mjs`
- Both `formatFirstName` and `formatLastName` now call `normalizeName` instead of duplicating `value.trim().replace(/\s+/g, ' ')`
- All public exports preserved

**Verification status:** ✓ passed (1 test passed, 0 failed)
