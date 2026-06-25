The test expects `title` mode to convert text to Title Case. The current `formatTitle.mjs` only has `upper` and `lower` modes. I'll add the `title` mode implementation:







**Summary:**
- **File modified:** `bench-targets/feature/src/formatTitle.mjs`
- **Change:** Added `title` mode that converts each word to Title Case (first letter uppercase, rest lowercase)
- **Verification:** All tests pass (1 passed, 0 failed)
- **Pattern:** Follows the existing mode-based structure with explicit checks for `'upper'`, `'lower'`, and `'title'` modes
