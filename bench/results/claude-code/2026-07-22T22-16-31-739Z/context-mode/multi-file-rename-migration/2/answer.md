

## Migration Complete

**Files edited:**
| Path | Change |
|------|--------|
| `bench-targets/rename/src/format-user.mjs` | Renamed `oldFormatUser` → `formatUserLabel` |
| `bench-targets/rename/src/index.mjs` | Export updated to `formatUserLabel` |

**Verification status:**
- ✅ Test passed: `node --test bench-targets/rename/format-user.test.mjs` (1 pass, 0 fail)
- ✅ No stale references: `grep -R oldFormatUser bench-targets/rename/src` returned no matches

Behavior is identical; all `oldFormatUser` references have been replaced with `formatUserLabel`.
