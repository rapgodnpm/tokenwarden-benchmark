I'll start by reading all files under bench-targets/rename to understand the current implementation.


















Now I understand the structure. I need to:
1. Rename `oldFormatUser` to `formatUserLabel` in both source files
2. Update the export in `index.mjs`
3. Update the test file import
4. Keep behavior identical

Let me make the changes:










Good - the test file already references `formatUserLabel`. Now let me run the verification tests:





## Migration Complete

**Summary:**
- Renamed `oldFormatUser` to `formatUserLabel` in `bench-targets/rename/src/format-user.mjs`
- Updated export in `bench-targets/rename/src/index.mjs`
- Test file (`bench-targets/rename/format-user.test.mjs`) already used `formatUserLabel`

**Commands run:**
- `node --test bench-targets/rename/format-user.test.mjs` → **TEST PASSES** (1 test, 0 failures)
- `grep -R oldFormatUser bench-targets/rename/src` → **NO MATCHES FOUND**
