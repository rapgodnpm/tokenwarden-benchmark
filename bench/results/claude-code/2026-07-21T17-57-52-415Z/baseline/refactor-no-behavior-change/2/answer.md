

## Refactor Complete

**File modified:** `bench-targets/refactor/src/name-formatters.mjs`

**Changes made:**
- Introduced shared helper `normalizeName(value)` that extracts the duplicated logic `value.trim().replace(/\s+/g, ' ')`
- Both `formatFirstName` and `formatLastName` now delegate to `normalizeName`
- Public exports remain unchanged: `formatFirstName` and `formatLastName`

**Verification:**
- Command: `node --test bench-targets/refactor/name-formatters.test.mjs`
- Result: **1 test passed, 0 failed** - behavior preserved as required
