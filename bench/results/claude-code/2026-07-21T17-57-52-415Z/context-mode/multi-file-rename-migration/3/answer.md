

All changes complete and verified.

## Summary

| File | Change |
|------|--------|
| `bench-targets/rename/src/format-user.mjs` | Renamed `oldFormatUser` → `formatUserLabel` |
| `bench-targets/rename/src/index.mjs` | Export updated to `formatUserLabel` |
| `bench-targets/rename/format-user.test.mjs` | No changes (already used `formatUserLabel`) |

## Verification Status

| Check | Status |
|-------|--------|
| `node --test bench-targets/rename/format-user.test.mjs` | ✅ Pass (1 test) |
| `grep -R oldFormatUser bench-targets/rename/src` | ✅ No matches (exit code 1) |
