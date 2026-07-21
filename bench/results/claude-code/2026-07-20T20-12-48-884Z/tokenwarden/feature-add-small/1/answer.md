

Verification passed. The title-case support has been added.

**Summary:**
- **Modified file:** `bench-targets/feature/src/formatTitle.mjs`
- **Changes:** Added a helper function `toTitleCase()` that converts strings to title case by lowercasing and then capitalizing the first character of each word (using `\b\w` regex boundary pattern). Added a mode check for `'title'` before the plain fallback.
- **Verification:** `node --test bench-targets/feature/formatTitle.test.mjs` passed (1 test, 0 failures)
