

**Summary:**

- **File modified:** `bench-targets/feature/src/formatTitle.mjs`
- **Change:** Added a `'title'` mode that lowercases the input and capitalizes the first letter of each word using `\b\w` word boundary regex.
- **Verification:** `node --test bench-targets/feature/formatTitle.test.mjs` passed with 1 test, 0 failures.
