I'll start by reading all files under bench-targets/rename to understand the current structure, then perform the migration.










Now I understand the structure. I need to:
1. Rename `oldFormatUser` to `formatUserLabel` in `src/format-user.mjs`
2. Update the export in `src/index.mjs`





Now let me verify the changes and run tests:





**Migration complete.**

**File changes:**
- `bench-targets/rename/src/format-user.mjs` - Renamed `oldFormatUser` → `formatUserLabel`
- `bench-targets/rename/src/index.mjs` - Updated export from `oldFormatUser` → `formatUserLabel`

**Verification:**
1. ✅ `node --test bench-targets/rename/format-user.test.mjs` — 1 pass, 0 failures
2. ✅ `grep -R oldFormatUser bench-targets/rename/src` — No matches found
