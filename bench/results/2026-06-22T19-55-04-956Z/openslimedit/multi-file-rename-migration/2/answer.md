I'll start by reading all files under the bench-targets/rename directory to understand the current structure.












Now I understand the issue. The test expects `formatUserLabel` but the source files define and export `oldFormatUser`. I need to rename the function from `oldFormatUser` to `formatUserLabel` in both source files.













## Summary

**Migration complete** ✅

**Files modified:**
- `bench-targets/rename/src/format-user.mjs` - Renamed `oldFormatUser` to `formatUserLabel`
- `bench-targets/rename/src/index.mjs` - Updated export from `oldFormatUser` to `formatUserLabel`

**Verification:**
- `node --test bench-targets/rename/format-user.test.mjs` - **Passed** (1 test, 0 failures)
- `grep -R oldFormatUser bench-targets/rename/src` - **No matches found**

The smallest safe changes were made: only renamed the identifier from `oldFormatUser` to `formatUserLabel` in both files, preserving the function behavior unchanged.
