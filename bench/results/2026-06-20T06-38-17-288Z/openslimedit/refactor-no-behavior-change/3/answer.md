I can see the duplicated whitespace normalization logic - both functions use `value.trim().replace(/\s+/g, ' ')`. I'll create a shared `normalizeName` helper and refactor both functions to use it.













**Refactor complete.**

**Changes:**
- Added shared `normalizeName` helper (line 1-3) containing the duplicated whitespace normalization logic
- Both `formatFirstName` and `formatLastName` now delegate to `normalizeName` (lines 5-11)
- Both public exports preserved

**Verification:** `node --test bench-targets/refactor/name-formatters.test.mjs` - **passed** (1 test, 0 failures)
