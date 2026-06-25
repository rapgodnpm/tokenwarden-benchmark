**Migration Complete**

**Files changed:**
1. `bench-targets/rename/src/index.mjs` - `oldFormatUser` → `formatUserLabel` in export statement
2. `bench-targets/rename/src/format-user.mjs` - `oldFormatUser` → `formatUserLabel` in function declaration

**Commands run:**
- `node --test bench-targets/rename/format-user.test.mjs`
- `grep -R oldFormatUser bench-targets/rename/src`

**Verification status:**
- ✅ Test passes (1 pass, 0 fail)
- ✅ No `oldFormatUser` references remain in `bench-targets/rename/src` (grep found no matches)
