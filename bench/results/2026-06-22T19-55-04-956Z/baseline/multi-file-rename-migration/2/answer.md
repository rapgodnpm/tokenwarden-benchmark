Found the structure. The migration needs to:
1. Rename `oldFormatUser` function to `formatUserLabel` in `src/format-user.mjs`
2. Update export in `src/index.mjs` to export `formatUserLabel` instead of `oldFormatUser`









Migration complete:
- **`src/format-user.mjs:1`** - Renamed `oldFormatUser` to `formatUserLabel`
- **`src/index.mjs:1`** - Updated export from `oldFormatUser` to `formatUserLabel`
- **Test verification**: `node --test` passes (1/1 tests)
- **No stale references**: `grep -R oldFormatUser bench-targets/rename/src` returns no matches
