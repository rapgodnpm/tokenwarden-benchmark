Added title-case support to `bench-targets/feature/src/formatTitle.mjs` using the existing mode-based pattern. The implementation capitalizes the first letter of each word and lowercases the rest.

**Change:** Added a `title` mode that calls `formatTitle(value, 'title')` to transform text like `'hello benchmark world'` → `'Hello Benchmark World'`.

**Verification:** Ran `node --test bench-targets/feature/formatTitle.test.mjs` - 1 test passed.
