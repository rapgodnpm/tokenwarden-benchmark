**Migration completed successfully:**

- **bench-targets/rename/src/format-user.mjs**: `oldFormatUser` → `formatUserLabel`
- **bench-targets/rename/src/index.mjs**: `oldFormatUser` → `formatUserLabel`

**Verification status:**
- `node --test bench-targets/rename/format-user.test.mjs`: pass ✓
- `grep -R oldFormatUser bench-targets/rename/src`: no matches ✓
