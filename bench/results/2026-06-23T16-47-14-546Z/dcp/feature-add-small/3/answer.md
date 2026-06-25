Now I understand the structure. I need to add title case support to the `formatTitle` function. The test expects `'Hello Benchmark World'` for title mode.







**Verification Status:** ✓ Passed

- **Modified file:** `bench-targets/feature/src/formatTitle.mjs`
- **Change:** Added title case mode using regex pattern `/\\b\\w/g` to capitalize first character of each word
- **Command run:** `node --test bench-targets/feature/formatTitle.test.mjs`
- **Result:** 1 pass, 0 failures
