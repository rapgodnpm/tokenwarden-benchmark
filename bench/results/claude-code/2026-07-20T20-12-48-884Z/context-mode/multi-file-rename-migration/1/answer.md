

## Migration Complete

**Files Modified:**
1. `bench-targets/rename/src/format-user.mjs` - Renamed `oldFormatUser` → `formatUserLabel`
2. `bench-targets/rename/src/index.mjs` - Updated export from `oldFormatUser` → `formatUserLabel`

**Verification Results:**
- ✅ Test passed: `node --test bench-targets/rename/format-user.test.mjs` (1 pass, 0 fail)
- ✅ No stale references: `grep -R oldFormatUser bench-targets/rename/src` found no matches

The behavior is identical; only the function name was migrated across the implementation and exports.
