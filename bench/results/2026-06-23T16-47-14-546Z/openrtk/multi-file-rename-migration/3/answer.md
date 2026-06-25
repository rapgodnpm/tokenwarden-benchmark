Now I'll make the required changes:












**Migration Complete**

**Changes made:**
1. `bench-targets/rename/src/format-user.mjs`: Renamed `oldFormatUser` → `formatUserLabel`
2. `bench-targets/rename/src/index.mjs`: Updated export from `oldFormatUser` → `formatUserLabel`

**Verification:**
- `node --test bench-targets/rename/format-user.test.mjs`: **PASSED** (1 test, 0 failures)
- `grep -R oldFormatUser bench-targets/rename/src`: **No matches** ✓
- `grep -R oldFormatUser bench-targets/rename`: **No matches** ✓

The behavior is identical (same function implementation), just with the renamed export matching what the test expects.
