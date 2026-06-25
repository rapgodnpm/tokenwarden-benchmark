I can see the migration needed: the test expects `formatUserLabel`, but `src/index.mjs` exports `oldFormatUser` and `src/format-user.mjs` defines `oldFormatUser`. I'll rename the function and update the export.











**Migration complete.**

**Files modified:**
- `bench-targets/rename/src/format-user.mjs`: Renamed `oldFormatUser` → `formatUserLabel` (definition)
- `bench-targets/rename/src/index.mjs`: Updated export `oldFormatUser` → `formatUserLabel`

**Verification:**
- `node --test bench-targets/rename/format-user.test.mjs`: ✅ pass 1, fail 0
- `grep -R oldFormatUser bench-targets/rename/src`: ✅ no matches (oldFormatUser references removed)
