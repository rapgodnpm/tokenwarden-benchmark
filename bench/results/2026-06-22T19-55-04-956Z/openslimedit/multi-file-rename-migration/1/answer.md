Migration complete:

**Files modified:**
- `bench-targets/rename/src/format-user.mjs` - Renamed `oldFormatUser` to `formatUserLabel`
- `bench-targets/rename/src/index.mjs` - Renamed export from `oldFormatUser` to `formatUserLabel`

**Commands run:**
1. `node --test bench-targets/rename/format-user.test.mjs` - ✓ Passed (1 test passed, 0 failed)
2. `grep -R oldFormatUser bench-targets/rename/src` - ✓ No matches found
