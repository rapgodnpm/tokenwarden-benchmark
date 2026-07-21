

Migration complete.

**Files edited:**
- `bench-targets/rename/src/format-user.mjs` — renamed `oldFormatUser` → `formatUserLabel`
- `bench-targets/rename/src/index.mjs` — updated export

**Verification status:**
- `node --test bench-targets/rename/format-user.test.mjs` — PASS (1 test)
- `grep -R oldFormatUser bench-targets/rename/src` — NO MATCHES (stale references removed)
