I'll start by reading the contents of the bench-targets/rename directory to understand the current structure and then make the necessary migration changes.









Now I understand the issue. The test file expects `formatUserLabel` but the source exports `oldFormatUser`. I need to rename all occurrences:













Migration complete:

**Files modified:**
- `bench-targets/rename/src/format-user.mjs` - Renamed `oldFormatUser` to `formatUserLabel`
- `bench-targets/rename/src/index.mjs` - Updated export from `oldFormatUser` to `formatUserLabel`
- `bench-targets/rename/format-user.test.mjs` - No changes (already imported `formatUserLabel`)

**Verification:**
- `node --test bench-targets/rename/format-user.test.mjs` - Passed (1 test, 0 failures)
- `grep -R oldFormatUser bench-targets/rename/src` - No matches found

**Result:** ✓ All changes complete, behavior preserved, no stale references remain.
