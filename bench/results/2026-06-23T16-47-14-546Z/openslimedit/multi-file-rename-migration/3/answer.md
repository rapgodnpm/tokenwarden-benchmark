Migration complete.

**Files modified:**
- `bench-targets/rename/src/format-user.mjs`: Renamed `oldFormatUser` to `formatUserLabel`
- `bench-targets/rename/src/index.mjs`: Updated export from `oldFormatUser` to `formatUserLabel`

**Commands run:**
- `node --test bench-targets/rename/format-user.test.mjs` — Test passed (1 pass, 0 fail)
- `grep -R oldFormatUser bench-targets/rename/src` — No matches found

**Verification status:** ✅ All passing
