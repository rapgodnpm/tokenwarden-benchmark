**Migration completed successfully:**

Files modified:
- `bench-targets/rename/src/index.mjs`: Changed export from `oldFormatUser` to `formatUserLabel`
- `bench-targets/rename/src/format-user.mjs`: Renamed `oldFormatUser` function to `formatUserLabel`

Verification results:
- `node --test bench-targets/rename/format-user.test.mjs`: PASS (1 test passed)
- `grep -R oldFormatUser bench-targets/rename/src`: NO MATCHES (0 stale references)
