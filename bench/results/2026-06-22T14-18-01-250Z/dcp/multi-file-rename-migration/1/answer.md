**Migration Complete**

**Changes made:**
- `bench-targets/rename/src/format-user.mjs`: Renamed `oldFormatUser` → `formatUserLabel`
- `bench-targets/rename/src/index.mjs`: Updated export `oldFormatUser` → `formatUserLabel`

**Verification:**
- ✅ `node --test bench-targets/rename/format-user.test.mjs`: PASSED (1 test, 0 failed)
- ✅ `grep -R oldFormatUser bench-targets/rename/src`: No matches found
