**Summary:**

- Read `/bench-targets/feature/src/formatTitle.mjs` and `/bench-targets/feature/formatTitle.test.mjs` to understand the existing mode-based pattern (`'plain'`, `'upper'`, `'lower'`)

- Added `'title'` mode support with this implementation:
  - Splits the string by spaces
  - Capitalizes the first letter of each word
  - Converts remaining letters to lowercase
  - Joins words back with spaces

- Modified `/bench-targets/feature/src/formatTitle.mjs` with the new title-case support (added 8 lines in the `'title'` mode block)

- Verified with `node --test` - all 1 test passing ✓
