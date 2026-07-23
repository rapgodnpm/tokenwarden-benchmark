

## Summary

Migrated `bench-targets/rename` from `oldFormatUser` to `formatUserLabel` across all files.

### Changes Made:

| File | Change |
|------|--------|
| `bench-targets/rename/src/format-user.mjs` | Renamed `oldFormatUser` function to `formatUserLabel` |
| `bench-targets/rename/src/index.mjs` | Updated export from `oldFormatUser` to `formatUserLabel` |
| `bench-targets/rename/format-user.test.mjs` | No changes needed (already used `formatUserLabel`) |

### Verification Status:

- ✅ Test passes: `node --test bench-targets/rename/format-user.test.mjs`
- ✅ No stale references: `grep -R oldFormatUser bench-targets/rename/src` returns no matches
