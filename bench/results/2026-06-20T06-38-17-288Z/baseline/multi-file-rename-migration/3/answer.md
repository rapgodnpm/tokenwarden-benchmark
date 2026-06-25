I'll start by reading all files under `bench-targets/rename` to understand the current implementation, then make the necessary migrations.













Now I understand the migration. The test expects `formatUserLabel` but the source files have `oldFormatUser`. I'll update the source files to match:





Now run the test and verify no oldFormatUser references remain:





## Verification Complete

✅ **Test passed**: `node --test bench-targets/rename/format-user.test.mjs` (1 test passing)

✅ **No stale references**: `grep -R oldFormatUser bench-targets/rename/src` found 0 matches

### File Changes:
1. **bench-targets/rename/src/format-user.mjs**: `oldFormatUser` → `formatUserLabel`
2. **bench-targets/rename/src/index.mjs**: Export `oldFormatUser` → `formatUserLabel`
