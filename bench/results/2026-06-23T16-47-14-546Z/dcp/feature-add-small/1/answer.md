Adding title-case support to `formatTitle.mjs`:







Added title-case support to `bench-targets/feature/src/formatTitle.mjs`.

- **File edited:** `bench-targets/feature/src/formatTitle.mjs`
- **Change:** Added `mode === 'title'` case that splits the value by spaces, capitalizes the first letter of each word, and joins back.
- **Command run:** `node --test bench-targets/feature/formatTitle.test.mjs`
- **Verification status:** Passed (1/1 tests passing)
