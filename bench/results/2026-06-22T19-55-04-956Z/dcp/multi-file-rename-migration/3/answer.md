**Migration complete.**

**Changes made:**
- `bench-targets/rename/src/format-user.mjs`: Renamed `oldFormatUser` to `formatUserLabel`
- `bench-targets/rename/src/index.mjs`: Updated export from `oldFormatUser` to `formatUserLabel`

**Verification:**
- `node --test` passes: 1 test passed
- `grep -R oldFormatUser bench-targets/rename/src` found no matches

Test output: `pass 1, fail 0`
