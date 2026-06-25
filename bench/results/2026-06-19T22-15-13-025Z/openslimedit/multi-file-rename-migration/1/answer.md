**Migration Complete**

Files modified:
- `bench-targets/rename/src/format-user.mjs`: Renamed `oldFormatUser` function to `formatUserLabel`
- `bench-targets/rename/src/index.mjs`: Updated export from `oldFormatUser` to `formatUserLabel`

Verification:
- `node --test bench-targets/rename/format-user.test.mjs`: ✅ PASS (1 test passed)
- `grep -R oldFormatUser bench-targets/rename/src`: ✅ NO MATCHES (migration complete)
