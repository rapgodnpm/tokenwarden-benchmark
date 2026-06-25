**Migration Complete**

**Files edited:**
- `bench-targets/rename/src/format-user.mjs`: Renamed `oldFormatUser` → `formatUserLabel` (line 1)
- `bench-targets/rename/src/index.mjs`: Updated export from `oldFormatUser` → `formatUserLabel` (line 1)

**Verification:**
- `node --test bench-targets/rename/format-user.test.mjs`: **PASS** (1 test passed)
- `grep -R oldFormatUser bench-targets/rename/src/`: **NO MATCHES** (clean)
