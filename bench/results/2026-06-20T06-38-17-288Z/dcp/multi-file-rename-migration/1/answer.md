**Migration complete:**

1. **Files edited:**
   - `bench-targets/rename/src/format-user.mjs`: Renamed `oldFormatUser` to `formatUserLabel` (line 1)
   - `bench-targets/rename/src/index.mjs`: Updated export from `oldFormatUser` to `formatUserLabel` (line 1)

2. **Test verification:**
   - `node --test bench-targets/rename/format-user.test.mjs` → **pass** (1 test passed)

3. **No stale references:**
   - `grep -R oldFormatUser bench-targets/rename/src` → **no matches**

Behavior preserved, legacy references removed.
