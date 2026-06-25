Now I understand the structure. The test expects `formatUserLabel` but the source exports `oldFormatUser`. I need to rename the function and export.









**Migration complete.**

**Changes made:**
- `bench-targets/rename/src/format-user.mjs`: Renamed function from `oldFormatUser` → `formatUserLabel`
- `bench-targets/rename/src/index.mjs`: Updated export from `oldFormatUser` → `formatUserLabel`

**Verification:**
- ✅ `node --test bench-targets/rename/format-user.test.mjs` — Test passed (1/1)
- ✅ `grep -R oldFormatUser bench-targets/rename/src` — No matches found
