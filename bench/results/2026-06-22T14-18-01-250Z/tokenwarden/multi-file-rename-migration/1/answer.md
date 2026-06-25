**Summary:**

Files modified (3):

1. `bench-targets/rename/src/format-user.mjs` - Renamed `oldFormatUser` to `formatUserLabel` on line 1
2. `bench-targets/rename/src/index.mjs` - Export changed from `oldFormatUser` to `formatUserLabel`
3. `bench-targets/rename/format-user.test.mjs` - Import from `formatUserLabel` (unchanged)

Commands:
```bash
node --test bench-targets/rename/format-user.test.mjs
grep -R oldFormatUser bench-targets/rename/src
```

Verification:
- Test: ✅ PASS (1 passed, 0 failed)
- No oldFormatUser in src: ✅ NONE
