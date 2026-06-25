I'll start by reading all files under bench-targets/rename to understand the current state, then make the necessary changes.








Let me read the actual .mjs files and search for oldFormatUser references:






Now I understand the structure. I need to:
1. Rename `oldFormatUser` to `formatUserLabel` in format-user.mjs
2. Update the export in index.mjs
3. Verify with tests





Now let me run verification:





Migration complete.

**Files modified:**
- `bench-targets/rename/src/format-user.mjs:1` - renamed `oldFormatUser` to `formatUserLabel`
- `bench-targets/rename/src/index.mjs:1` - updated export from `oldFormatUser` to `formatUserLabel`

**Verification:**
- ✓ `node --test bench-targets/rename/format-user.test.mjs` - passed (1 test, 0 failures)
- ✓ `grep -R oldFormatUser bench-targets/rename/src` - no matches found
