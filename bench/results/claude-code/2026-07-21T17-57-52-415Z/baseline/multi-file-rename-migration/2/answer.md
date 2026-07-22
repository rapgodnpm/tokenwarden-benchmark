

Migration complete. Here's the summary:

**Files Modified:**
- `bench-targets/rename/src/format-user.mjs` - Renamed `oldFormatUser` function to `formatUserLabel`
- `bench-targets/rename/src/index.mjs` - Updated export from `oldFormatUser` to `formatUserLabel`

**Verification Results:**
- ✅ Test passed: `node --test bench-targets/rename/format-user.test.mjs` (1 pass, 0 fail)
- ✅ No remaining references: `grep -R oldFormatUser bench-targets/rename/src` found no matches
