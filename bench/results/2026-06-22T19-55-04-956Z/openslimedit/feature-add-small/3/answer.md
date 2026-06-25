I'll start by reading the two files to understand the existing code structure and test patterns.





Now I understand the structure. The `formatTitle` function currently supports 'upper', 'lower', and 'plain' modes. I need to add 'title' mode to convert text to title case. Let me implement this:




Now let me run the test to verify the implementation:




The test is failing because I'm modifying `words` directly. I need to create a new array instead to avoid mutating the parameter:







The issue persists. Let me check the test file - it seems the test itself is the problem since it's trying to reassign an import:




Let me check what files actually exist in this directory:










Now I see the exact problem. On line 5, `const words` is declared, and then on line 10, I'm trying to reassign `words =` which is illegal in strict mode. I need to keep using the same variable reference:







The test is failing because my implementation isn't using 'Hello Benchmark World' correctly. I'm joining with original words instead of mapped words. Let me fix this:







## Summary

**File modified:**
- `bench-targets/feature/src/formatTitle.mjs`

**Changes made:**
Added 'title' mode support by:
1. Adding a check for `mode === 'title'` that calls the new `formatTitleTitleCase` helper function
2. Added `formatTitleTitleCase` function that:
   - Splits the input by spaces
   - Maps each word to capitalize the first letter and lowercase the rest
   - Rejoins the words back into a string
3. Uses a new array (`const mapped`) to avoid mutating `const words` (strict mode safety)

**Commands run:**
```bash
node --test bench-targets/feature/formatTitle.test.mjs
```

**Verification status:** ✅ PASS (1 test passed, 0 failed)
