I can see the duplicated logic: both `formatFirstName` and `formatLastName` use `.trim().replace(/\s+/g, ' ')`. I need to create a shared `normalizeWhitespace` helper and refactor both functions to use it.










Wait, I created the temp file in /tmp but need it in the correct location. Let me fix this:







All tests pass. Let me verify the final refactored code:





**Summary:**
- Created `bench-targets/refactor/src/normalize.mjs` with shared `normalizeWhitespace` helper
- Refactored `bench-targets/refactor/src/name-formatters.mjs` to use `normalizeWhitespace` instead of duplicated logic
- Kept public exports `formatFirstName` and `formatLastName` unchanged
- Tests pass (1/1 passing)

**Refactoring:**
- Removed duplicated `value.trim().replace(/\s+/g, ' ')` logic from both format functions
- Both now delegate to the single shared `normalizeWhitespace` helper
- No behavior change
