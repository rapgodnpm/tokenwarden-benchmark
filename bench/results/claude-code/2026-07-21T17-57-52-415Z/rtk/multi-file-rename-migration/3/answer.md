

## Summary

### Changes Made:
| File | Change |
|------|--------|
| `bench-targets/rename/src/format-user.mjs` | Renamed `oldFormatUser` to `formatUserLabel` |
| `bench-targets/rename/src/index.mjs` | Updated export from `oldFormatUser` to `formatUserLabel` |

### Verification:
- ✅ `node --test bench-targets/rename/format-user.test.mjs` — PASS (1 test, 0 failures)
- ✅ `grep -R oldFormatUser bench-targets/rename/src` — No stale references found
