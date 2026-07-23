

Refactoring complete. Here's a summary:

**File modified:** `/work/tokenwarden-refactor-no-behavior-change-1/repo/bench-targets/refactor/src/name-formatters.mjs`

**Changes made:**
- Introduced shared helper function `normalizeName(value)` that handles: `value.trim().replace(/\s+/g, ' ')`
- Both `formatFirstName` and `formatLastName` now delegate to `normalizeName`
- Existing public exports remain unchanged (`formatFirstName` and `formatLastName`)

**Verification status:** ✅ **PASS**

The test `name formatters preserve behavior` passed, confirming the refactoring preserves the original behavior.
