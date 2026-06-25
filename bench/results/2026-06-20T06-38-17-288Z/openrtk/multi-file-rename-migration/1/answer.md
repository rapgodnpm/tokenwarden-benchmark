**Migration Summary:**

| File | Change |
|------|--------|
| `bench-targets/rename/src/format-user.mjs` | Renamed `oldFormatUser` → `formatUserLabel` |
| `bench-targets/rename/src/index.mjs` | Updated export: `oldFormatUser` → `formatUserLabel` |

**Verification:**
- ✅ Test passes: `node --test bench-targets/rename/format-user.test.mjs` (1 pass, 0 fail)
- ✅ No stale references: `grep -R oldFormatUser bench-targets/rename/src` (no matches)
- ✅ Export verified: `formatUserLabel` is correctly exported from index.mjs
