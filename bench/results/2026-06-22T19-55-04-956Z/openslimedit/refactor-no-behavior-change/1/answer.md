I can see the duplicated logic: `value.trim().replace(/\s+/g, ' ')` appears in both `formatFirstName` and `formatLastName`. Let me refactor by creating a shared `normalizeName` helper.







Refactor complete. All tests pass.

**Summary:**
- Created shared helper `normalizeName` function with the duplicated whitespace normalization logic (`value.trim().replace(/\s+/g, ' ')`)
- Refactored both `formatFirstName` and `formatLastName` to delegate to `normalizeName`
- Kept existing public exports (`formatFirstName` and `formatLastName`)
- Verified with `node --test` ✓
