

Migration complete. Here's the summary:

**Files modified:**
1. `bench-targets/rename/src/format-user.mjs` - Renamed `oldFormatUser` to `formatUserLabel`
2. `bench-targets/rename/src/index.mjs` - Updated export from `oldFormatUser` to `formatUserLabel`

**Verification status:**
- ✅ `node --test bench-targets/rename/format-user.test.mjs` - PASSED (1 test passed)
- ✅ `grep -R oldFormatUser bench-targets/rename/src` - No matches found
