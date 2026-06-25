**Migration Complete**

Changes made:
1. ✅ `bench-targets/rename/src/format-user.mjs`: Renamed `oldFormatUser` to `formatUserLabel` (line 1)
2. ✅ `bench-targets/rename/src/index.mjs`: Updated export from `oldFormatUser` to `formatUserLabel`

**Verification:**
- ✅ `node --test bench-targets/rename/format-user.test.mjs`: Test passed (1/1 ok)
- ✅ `grep -R oldFormatUser bench-targets/rename/src`: No matches found
