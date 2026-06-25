Migration complete. Final answer:

**Files modified:**
- `bench-targets/rename/src/format-user.mjs`: Renamed `oldFormatUser` to `formatUserLabel` (line 1)
- `bench-targets/rename/src/index.mjs`: Updated export from `oldFormatUser` to `formatUserLabel` (line 1)

**Commands run:**
1. `node --test bench-targets/rename/format-user.test.mjs`
2. `grep -R oldFormatUser bench-targets/rename/src`

**Verification status:**
- ✅ Test passes: `formatUserLabel formats a display label` (1 pass)
- ✅ No stale `oldFormatUser` references remain in `bench-targets/rename/src`
