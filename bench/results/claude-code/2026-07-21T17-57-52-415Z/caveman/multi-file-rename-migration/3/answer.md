

Migration complete.

**Changes:**
- `bench-targets/rename/src/format-user.mjs`: `oldFormatUser` → `formatUserLabel`
- `bench-targets/rename/src/index.mjs`: `oldFormatUser` → `formatUserLabel`
- `bench-targets/rename/format-user.test.mjs`: no changes (already uses `formatUserLabel`)

**Verification:**
- Test: `node --test bench-targets/rename/format-user.test.mjs` → 1 pass, 0 fail
- `grep -R oldFormatUser bench-targets/rename/src` → no matches
