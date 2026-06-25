I'll work through this multi-file migration task systematically.













Now I understand the structure. I need to:
1. Rename `oldFormatUser` to `formatUserLabel` in `format-user.mjs`
2. Update exports in `index.mjs`
3. Verify with tests and grep









**Migration complete.**

Files changed:
- `bench-targets/rename/src/format-user.mjs`: renamed `oldFormatUser` → `formatUserLabel`
- `bench-targets/rename/src/index.mjs`: updated export to `formatUserLabel`

Verification:
- Tests: `node --test bench-targets/rename/format-user.test.mjs` - **PASS** (1 passed, 0 failed)
- Grep: `grep -R oldFormatUser bench-targets/rename/src` - **PASS** (no matches found)
