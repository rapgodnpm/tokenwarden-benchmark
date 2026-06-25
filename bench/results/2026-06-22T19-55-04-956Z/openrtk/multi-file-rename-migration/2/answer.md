**Verification Results:**

1. **Test passed:** `node --test bench-targets/rename/format-user.test.mjs` - 1 test passed
2. **No oldFormatUser references:** `grep -R oldFormatUser bench-targets/rename/src` - 0 matches

**File changes made:**
| File Path | Change |
|----------|--------|
| `bench-targets/rename/src/format-user.mjs` | `oldFormatUser` → `formatUserLabel` |
| `bench-targets/rename/src/index.mjs` | `{ oldFormatUser }` → `{ formatUserLabel }` |
