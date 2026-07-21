

## Summary

Migration complete. Files modified:

- `bench-targets/rename/src/format-user.mjs`: Renamed `oldFormatUser` → `formatUserLabel`
- `bench-targets/rename/src/index.mjs`: Renamed export `oldFormatUser` → `formatUserLabel`

**Verification:**

- `node --test bench-targets/rename/format-user.test.mjs`: PASS (1 test)
- `grep -R oldFormatUser bench-targets/rename/src`: No matches
