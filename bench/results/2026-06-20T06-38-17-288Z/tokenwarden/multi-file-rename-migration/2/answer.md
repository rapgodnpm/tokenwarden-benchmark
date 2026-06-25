I'll first read all files under bench-targets/rename to understand the current implementation before making any changes.



















Now I understand the current state:
- `format-user.mjs` exports `oldFormatUser` function
- `src/index.mjs` exports `oldFormatUser` from the module
- `format-user.test.mjs` imports `formatUserLabel` (but doesn't exist yet)

The test expects `formatUserLabel` but the implementation has `oldFormatUser`. I need to rename the function and update exports. Let me update the source files:







Now let me run the verification tests:





Migration complete. Summary:

**Files migrated:**
- `bench-targets/rename/src/format-user.mjs`: Renamed `oldFormatUser` to `formatUserLabel`
- `bench-targets/rename/src/index.mjs`: Updated export to use `formatUserLabel`

**Verification:**
- `node --test bench-targets/rename/format-user.test.mjs`: ✅ Pass (1 test passed)
- `grep -R "oldFormatUser" bench-targets/rename/src/`: ✅ No matches found
