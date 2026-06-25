**Migration Complete**

Files modified:
- `bench-targets/rename/src/format-user.mjs`: renamed `oldFormatUser` → `formatUserLabel`
- `bench-targets/rename/src/index.mjs`: updated export to `formatUserLabel`

Verification:
1. ✅ `node --test bench-targets/rename/format-user.test.mjs` passed (1 test ok)
2. ✅ `grep -R oldFormatUser bench-targets/rename/src` returned no matches
