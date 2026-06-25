Now I'll make the changes to rename `oldFormatUser` to `formatUserLabel`:









**Migration Complete**

### Changes Made:
1. **`bench-targets/rename/src/format-user.mjs`**: Renamed function `oldFormatUser` → `formatUserLabel`
2. **`bench-targets/rename/src/index.mjs`**: Changed export from `oldFormatUser` → `formatUserLabel`

### Verification:
| Check | Status |
|-------|--------|
| `node --test bench-targets/rename/format-user.test.mjs` | ✅ PASS (1/1) |
| `grep -R oldFormatUser bench-targets/rename/src` | ✅ No matches |
