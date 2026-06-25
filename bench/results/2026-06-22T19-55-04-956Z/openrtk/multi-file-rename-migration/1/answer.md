**Migration Summary**

✅ Completed migration from `oldFormatUser` to `formatUserLabel`

**Files modified:**

1. **bench-targets/rename/src/format-user.mjs**
   - Changed `oldFormatUser` function name to `formatUserLabel`

2. **bench-targets/rename/src/index.mjs**
   - Changed export from `oldFormatUser` to `formatUserLabel`

**Files read:**
- bench-targets/rename/format-user.test.mjs
- bench-targets/rename/src/format-user.mjs
- bench-targets/rename/src/index.mjs

**Verification status:**
- `node --test bench-targets/rename/format-user.test.mjs` → **PASS** (1/1)
- `grep -R oldFormatUser bench-targets/rename/src` → **No matches found** ✅
