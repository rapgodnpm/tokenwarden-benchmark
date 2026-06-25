**Migration Complete**

**Files Modified:**
- `bench-targets/rename/src/format-user.mjs`: Renamed `oldFormatUser` to `formatUserLabel`
- `bench-targets/rename/src/index.mjs`: Export renamed from `oldFormatUser` to `formatUserLabel`

**Commands Run:**
```bash
node --test bench-targets/rename/format-user.test.mjs
grep -R oldFormatUser bench-targets/rename/src
```

**Verification Status:**
- ✅ Test passed (1 pass, 0 fail)
- ✅ No `oldFormatUser` references found in `bench-targets/rename/src`
