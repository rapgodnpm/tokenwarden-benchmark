The test expects 'Hello Benchmark World' but gets 'hello benchmark world'. I need to fix the word splitting and capitalization logic:







Test passes. Verify all modes still work:




**Verification complete - all tests pass.**

**Summary:**
- **Modified file:** `bench-targets/feature/src/formatTitle.mjs`
- **Change:** Added `title` mode that converts text to title case (each word capitalized, all letters except first in each word lowercase)
- **Command run:** `node --test bench-targets/feature/formatTitle.test.mjs`
- **Status:** ✅ Pass (1 test)
