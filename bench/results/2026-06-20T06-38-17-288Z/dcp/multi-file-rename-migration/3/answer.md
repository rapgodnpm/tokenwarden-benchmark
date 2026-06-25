I'll start by reading all files under bench-targets/rename to understand the current implementation.









Now I understand the current state. The test file uses `formatUserLabel` but the source exports `oldFormatUser`. I need to:
1. Rename `oldFormatUser` to `formatUserLabel` in `src/format-user.mjs`
2. Update the export in `src/index.mjs`
3. The test file already imports from the correct index path, so no changes needed there

Let me make the necessary changes:





Now let me verify the changes:





**Migration Complete**

**Files Modified:**
- `bench-targets/rename/src/format-user.mjs` - Renamed `oldFormatUser` → `formatUserLabel`
- `bench-targets/rename/src/index.mjs` - Updated export to use `formatUserLabel`

**Verification Status:**
1. `node --test bench-targets/rename/format-user.test.mjs` - **PASSED** (1 test passed, 0 failed)
2. `grep -R oldFormatUser bench-targets/rename/src` - **CLEAN** (no matches found)
