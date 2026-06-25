Migration complete:

**Files modified:**
- `bench-targets/rename/src/index.mjs`: `oldFormatUser` → `formatUserLabel`
- `bench-targets/rename/src/format-user.mjs`: `oldFormatUser` → `formatUserLabel`

**Verification:**
1. `node --test bench-targets/rename/format-user.test.mjs` - PASSED (1 test, 0 failures)
2. `grep -R oldFormatUser bench-targets/rename/src` - NO MATCHES
