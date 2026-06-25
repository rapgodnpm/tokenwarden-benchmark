I'll start by reading all files under bench-targets/rename to understand the current structure and implementation.















Now I understand the current state. The test expects `formatUserLabel` but the implementation uses `oldFormatUser`. I need to:
1. Rename `oldFormatUser` to `formatUserLabel` in `format-user.mjs`
2. Update the export in `index.mjs`

Let me start the migration:







Now let me verify the changes by running the tests:







## Summary

**Migration completed successfully.**

**Files modified:**
1. `bench-targets/rename/src/format-user.mjs` - Renamed function from `oldFormatUser` to `formatUserLabel`
2. `bench-targets/rename/src/index.mjs` - Updated export from `oldFormatUser` to `formatUserLabel`

**Commands run:**
- `node --test bench-targets/rename/format-user.test.mjs` - **PASSED** ✓
- `grep -R oldFormatUser bench-targets/rename/src` - **NO MATCHES** ✓

**Verification status:**
- Test passes (1/1 passed)
- No stale `oldFormatUser` references found in source directory
