I'll start by reading all files under bench-targets/rename, then analyze what needs to be changed.















Now I need to make the changes to rename `oldFormatUser` to `formatUserLabel`:





Now let me verify the test passes:





Migration complete. Summary:

**Changes Made:**
1. `bench-targets/rename/src/index.mjs` - Renamed export from `oldFormatUser` to `formatUserLabel`
2. `bench-targets/rename/src/format-user.mjs` - Renamed function from `oldFormatUser` to `formatUserLabel`

**Verification:**
- `node --test bench-targets/rename/format-user.test.mjs` passes (1 passed)
- `grep -R oldFormatUser bench-targets/rename/src` returns no matches
