I need to add a 'title' mode to the formatTitle function. Let me implement a simple title case function:




Now let me verify with the test command:







Done.

**File modified:** `bench-targets/feature/src/formatTitle.mjs`

**Change:** Added title case mode (lines 4-6) that:
- Splits the value by spaces
- Capitalizes first letter, lowercases the rest of each word
- Joins back with spaces

**Verification:**
```
node --test bench-targets/feature/formatTitle.test.mjs
# tests 1
# pass 1
# fail 0
```
