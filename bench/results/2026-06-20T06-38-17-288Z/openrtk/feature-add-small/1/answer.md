Now I need to add title-case support. Looking at the test, `formatTitle('hello benchmark world', 'title')` should return `'Hello Benchmark World'` (first letter capitalized for each word, rest lowercase).

I'll add a title case implementation that:
1. Splits the string by spaces into words
2. Capitalizes the first letter of each word
3. Lowercases the rest of each word
4. Rejoins them with spaces







**Summary:**

**File modified:** `bench-targets/feature/src/formatTitle.mjs`

**Change made:** Added title case mode implementation that:
- Splits input by spaces
- Capitalizes first letter of each word
- Lowercases remaining letters of each word
- Rejoins with spaces

**Command run:** `node --test bench-targets/feature/formatTitle.test.mjs`

**Verification status:** ✅ Passed (1 test passed, 0 failed)
