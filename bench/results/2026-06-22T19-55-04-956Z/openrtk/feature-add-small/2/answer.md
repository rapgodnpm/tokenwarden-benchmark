Added `title` mode support to formatTitle:
- Added logic to transform first character to uppercase and rest to lowercase
- Uses `split(' ')` and `join(' ')` to preserve existing word boundaries

File edited: `bench-targets/feature/src/formatTitle.mjs`

Verification: Passed (1 test passed, 0 failed)
