I'll start by reading all files under bench-targets/rename to understand the current structure.





Found 2 `oldFormatUser` references. Now reading all source files completely:






Now I understand the structure. The test expects `formatUserLabel` but the code exports `oldFormatUser`. I'll make the minimal changes:









**Migration Summary:**

| File | Change |
|------|--------|
| `bench-targets/rename/src/format-user.mjs:1` | Renamed `oldFormatUser` → `formatUserLabel` |
| `bench-targets/rename/src/index.mjs:1` | Updated export: `oldFormatUser` → `formatUserLabel` |

**Verification:**
- ✅ `node --test bench-targets/rename/format-user.test.mjs` - PASS (1 test)
- ✅ `grep -R oldFormatUser bench-targets/rename/src` - No matches

Behavior unchanged; only function name migrated to match test expectations.
