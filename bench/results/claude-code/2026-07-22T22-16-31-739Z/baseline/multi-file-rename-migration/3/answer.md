

## Summary

The migration from `oldFormatUser` to `formatUserLabel` is complete:

| File | Change |
|------|--------|
| `bench-targets/rename/src/format-user.mjs` | Renamed function `oldFormatUser` → `formatUserLabel` |
| `bench-targets/rename/src/index.mjs` | Updated export `{ oldFormatUser }` → `{ formatUserLabel }` |
| `bench-targets/rename/format-user.test.mjs` | No change needed (already used `formatUserLabel`) |

**Verification Results:**
- ✅ Test passed: `node --test bench-targets/rename/format-user.test.mjs`
- ✅ No stale references: `grep -R oldFormatUser bench-targets/rename/src` returned no matches
- ✅ Behavior identical: output unchanged
