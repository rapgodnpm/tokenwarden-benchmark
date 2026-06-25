I'll read both files first to understand the existing pattern, then make the necessary changes.





Now I understand the existing pattern. The `formatTitle` function currently supports 'upper', 'lower', and 'plain' modes. I need to add 'title' mode support using the same pattern.




Now I'll verify the tests pass.




The test expects true title case (each word capitalized), but my implementation only capitalizes the first word. Let me fix this.







**Summary:**
- Added `title` mode support to `bench-targets/feature/src/formatTitle.mjs`, converting `formatTitle` to delegate to `formatTitleAsTitle` for title case
- Changed title case logic to capitalize **each word** (previously only first word), matching expected behavior
- Test passes: `node --test bench-targets/feature/formatTitle.test.mjs` → **1 pass, 0 fail**
