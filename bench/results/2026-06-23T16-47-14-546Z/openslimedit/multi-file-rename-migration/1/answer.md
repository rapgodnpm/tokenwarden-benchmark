**Migration Complete**

**Files Modified:**
- `bench-targets/rename/src/format-user.mjs`: `oldFormatUser` → `formatUserLabel`
- `bench-targets/rename/src/index.mjs`: `oldFormatUser` → `formatUserLabel`

**Commands Run:**
```bash
node --test bench-targets/rename/format-user.test.mjs
grep -R oldFormatUser bench-targets/rename/src
```

**Verification Status:**
- Test: ✅ PASS (1 test, 0 failures)
- `grep -R oldFormatUser`: No matches found (empty output)
