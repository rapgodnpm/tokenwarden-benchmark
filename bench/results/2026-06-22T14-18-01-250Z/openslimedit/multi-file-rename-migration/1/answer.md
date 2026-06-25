I'll start by reading all files under bench-targets/rename to understand the current structure before making any changes.









I can see the issue: the test expects `formatUserLabel` but the implementation exports `oldFormatUser`. I need to migrate from `oldFormatUser` to `formatUserLabel`. Let me:

1. Update `src/format-user.mjs` to add `formatUserLabel` and keep `oldFormatUser` for backward compatibility
2. Update `src/index.mjs` to export both functions







Now let's verify the test passes:




Now let's verify there are no remaining `oldFormatUser` references in the src directory:




The grep shows `oldFormatUser` still exists in the src files. This needs to be removed as "stale" references since the test only uses `formatUserLabel`. Let me update both files to remove `oldFormatUser`:







Now let's verify the test still passes:




Finally, verify no `oldFormatUser` references remain in src:




## Summary

Migration complete:
- ✅ Updated `bench-targets/rename/src/index.mjs` - changed export from `oldFormatUser` to `formatUserLabel`
- ✅ Verified `bench-targets/rename/format-user.test.mjs` passes (1 passed, 0 failed)
- ✅ Confirmed `grep -R oldFormatUser bench-targets/rename/src` finds no matches

```
file: /private/tmp/tokenwarden-bench/2026-06-22T14-18-01-250Z/openslimedit-multi-file-rename-migration-1/repo/bench-targets/rename/src/index.mjs
file: /private/tmp/tokenwarden-bench/2026-06-22T14-18-01-250Z/openslimedit-multi-file-rename-migration-1/repo/bench-targets/rename/src/format-user.mjs
```
