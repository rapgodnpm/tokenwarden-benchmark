**Migration Complete**

**Changes made:**
- `bench-targets/rename/src/format-user.mjs`: Renamed `oldFormatUser` function to `formatUserLabel`
- `bench-targets/rename/src/index.mjs`: Updated export from `oldFormatUser` to `formatUserLabel`

**Verification:**
- ✓ Test passes: `formatUserLabel formats a display label` (1 passed, 0 failed)
- ✓ No stale references: `grep -R oldFormatUser bench-targets/rename/src` returned no matches
