I'll start by reading all files under bench-targets/rename to understand the current structure before making changes.












Now I understand the current state. Let me make the necessary changes:

1. `src/format-user.mjs`: Rename `oldFormatUser` to `formatUserLabel`
2. `src/index.mjs`: Export `formatUserLabel` instead of `oldFormatUser`
3. `format-user.test.mjs`: Already uses `formatUserLabel` (no changes needed)







Now verifying the changes:





Migration complete:

- `bench-targets/rename/src/format-user.mjs`: `oldFormatUser` → `formatUserLabel`
- `bench-targets/rename/src/index.mjs`: Export updated to `formatUserLabel`
- `bench-targets/rename/format-user.test.mjs`: No changes needed (already references `formatUserLabel`)
- Test passed: 1/1
- No stale `oldFormatUser` references in `bench-targets/rename/src` (grep returned empty)
