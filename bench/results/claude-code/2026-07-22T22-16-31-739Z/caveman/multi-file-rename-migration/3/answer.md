

Migration complete.

**Files changed:**
- `bench-targets/rename/src/format-user.mjs`: `oldFormatUser` → `formatUserLabel`
- `bench-targets/rename/src/index.mjs`: `oldFormatUser` → `formatUserLabel` export

**Verification:**
- `node --test` passes (1 test OK)
- `grep -R oldFormatUser bench-targets/rename/src` returns no matches
