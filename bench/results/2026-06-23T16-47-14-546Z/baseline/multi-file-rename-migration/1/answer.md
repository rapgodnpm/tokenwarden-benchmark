**Final Answer:**

**Files Modified:**
1. `bench-targets/rename/src/format-user.mjs` - renamed `oldFormatUser` → `formatUserLabel`
2. `bench-targets/rename/src/index.mjs` - updated export to `formatUserLabel`

**Tests Run:**
```bash
node --test bench-targets/rename/format-user.test.mjs
```
**Result:** PASS (1 passed, 0 failed)

**Verification:**
```bash
grep -R oldFormatUser bench-targets/rename/src
```
**Result:** No matches found (migration complete)

**Status:** ✅ All requirements met - behavior identical, stale references removed.
