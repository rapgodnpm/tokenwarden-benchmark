I'll explore the repository structure and understand the migration task for multi-file-rename-migration.













I now understand the migration task:
- `src/format-user.mjs` exports `oldFormatUser` function
- `src/index.mjs` exports `oldFormatUser` 
- `format-user.test.mjs` already expects `formatUserLabel` (the new name)

I need to rename `oldFormatUser` to `formatUserLabel` in the source files to match what the test expects.













Migration complete:

**Files modified:**
- `bench-targets/rename/src/index.mjs`: Changed `export { oldFormatUser }` to `export { formatUserLabel }`
- `bench-targets/rename/src/format-user.mjs`: Changed `function oldFormatUser` to `function formatUserLabel`

**Verification:**
- `node --test bench-targets/rename/format-user.test.mjs`: PASSED (1 test passing)
- `grep -R oldFormatUser bench-targets/rename/src`: No matches found ✓
