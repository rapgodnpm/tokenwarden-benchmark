

---

## Summary

### Files Changed

| File | Change |
|------|--------|
| `bench-targets/rename/src/format-user.mjs` | Renamed `oldFormatUser` → `formatUserLabel` |
| `bench-targets/rename/src/index.mjs` | Renamed export from `oldFormatUser` → `formatUserLabel` |

### Verification Status

| Check | Result |
|-------|--------|
| `node --test bench-targets/rename/format-user.test.mjs` | **PASS** (1 pass, 0 fail) |
| `grep -R oldFormatUser bench-targets/rename/src` | **CLEAN** (no matches) |

### Behavioral Impact
- None. Function signature and implementation unchanged.
- Tests already referenced `formatUserLabel`, confirming the intended API.
