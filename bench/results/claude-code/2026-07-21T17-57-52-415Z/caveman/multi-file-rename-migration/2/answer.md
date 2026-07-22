

Migration complete.

Files changed:
- `bench-targets/rename/src/format-user.mjs`: renamed `oldFormatUser` to `formatUserLabel`
- `bench-targets/rename/src/index.mjs`: export updated to `formatUserLabel`

Verification:
- `node --test bench-targets/rename/format-user.test.mjs`: PASS (1 test)
- `grep -R oldFormatUser bench-targets/rename/src`: no matches
