I'll start by reading all files under `bench-targets/rename` to understand the current implementation before making any changes.









Now I understand the issue. The test imports `formatUserLabel` from `./src/index.mjs`, but the implementation files export `oldFormatUser`. I need to:

1. Rename `oldFormatUser` to `formatUserLabel` in `src/format-user.mjs`
2. Update `src/index.mjs` to export `formatUserLabel`

Let me also check for any other references to `oldFormatUser` in the bench-targets/rename directory:




Now I'll rename `oldFormatUser` to `formatUserLabel` in both implementation files:





Now let me verify the changes by running the tests and confirming no `oldFormatUser` references remain:





## Summary

**Migrated `bench-targets/rename` from `oldFormatUser` to `formatUserLabel`:**

| File | Change |
|------|--------|
| `bench-targets/rename/src/format-user.mjs` | Renamed `oldFormatUser` to `formatUserLabel` |
| `bench-targets/rename/src/index.mjs` | Exported `formatUserLabel` instead of `oldFormatUser` |

**Commands run:**
```bash
node --test bench-targets/rename/format-user.test.mjs
grep -R oldFormatUser bench-targets/rename/src/
```

**Verification status:**
- ✅ Test passed: `# pass 1 # fail 0`
- ✅ No `oldFormatUser` references found in source files (grep returned no output)
