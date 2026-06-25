I'll start by reading all files under bench-targets/rename to understand the current implementation.









Now I understand the migration needed:
1. `src/index.mjs` exports `oldFormatUser` (needs to be `formatUserLabel`)
2. `src/format-user.mjs` exports `oldFormatUser` (needs to be `formatUserLabel`)
3. Test already references `formatUserLabel`

Let me perform the migration:





Now let me verify the changes:





```

**Migration Complete:**

| File | Change |
|------|--------|
| `bench-targets/rename/src/format-user.mjs` | Renamed `oldFormatUser` → `formatUserLabel` |
| `bench-targets/rename/src/index.mjs` | Exports `formatUserLabel` instead of `oldFormatUser` |

**Verification Results:**
| Command | Result |
|---------|--------|
| `node --test bench-targets/rename/format-user.test.mjs` | ✅ PASS (1/1 tests passed) |
| `grep -R oldFormatUser bench-targets/rename/src` | ✅ NO MATCHES |
