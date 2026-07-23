

**Summary:**

- **File modified:** `bench-targets/feature/src/formatTitle.mjs`
- **Change:** Added `'title'` mode that lowercases the value, then capitalizes the first character of each word using `\b\w` boundary match
- **Verification:** `node --test bench-targets/feature/formatTitle.test.mjs` — **PASS** (1 test, 1 pass, 0 fail)
