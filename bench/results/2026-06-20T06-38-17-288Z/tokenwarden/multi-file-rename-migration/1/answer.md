**Migration completed successfully:**

- `bench-targets/rename/src/format-user.mjs`: `oldFormatUser` → `formatUserLabel`
- `bench-targets/rename/src/index.mjs`: export changed to `formatUserLabel`
- `bench-targets/rename/format-user.test.mjs`: already imports `formatUserLabel` (test updated)

**Verification:**
- `node --test bench-targets/rename/format-user.test.mjs`: ✓ PASS (1 test passed, 0 failed)
- `grep -R oldFormatUser bench-targets/rename/src`: ✓ NO MATCHES (migration complete)
