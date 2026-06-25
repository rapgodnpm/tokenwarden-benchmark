I'll start by reading all files under bench-targets/rename to understand the current implementation.









Now I can see the issue. The test expects `formatUserLabel` (line 3), but the source exports `oldFormatUser`. I need to rename `oldFormatUser` to `formatUserLabel` across all files.




Now I'll make the necessary changes. I need to:
1. Update `src/index.mjs` to export `formatUserLabel` instead of `oldFormatUser`
2. Update `src/format-user.mjs` to define `formatUserLabel` instead of `oldFormatUser`





Now let me verify the test passes:




Now verify no `oldFormatUser` references remain in source files:




**Migration complete:**

| File | Change |
|------|--------|
| `bench-targets/rename/src/index.mjs` | `export { oldFormatUser }` → `export { formatUserLabel }` |
| `bench-targets/rename/src/format-user.mjs` | `export function oldFormatUser(user)` → `export function formatUserLabel(user)` |
| `bench-targets/rename/format-user.test.mjs` | No changes needed (already imports `formatUserLabel`) |

**Commands run:**
- `node --test bench-targets/rename/format-user.test.mjs` - ✅ Passes (1 test passing)
- `grep -R "oldFormatUser" bench-targets/rename/src/` - ✅ No matches found
