The existing pattern uses a `mode` parameter with `'upper'` and `'lower'` cases. I'll add `'title'` mode following the same pattern.







Test passed. Now verifying all existing modes still work:




Let me verify all modes work together in a quick additional check:







**Summary:**
- **File edited:** `bench-targets/feature/src/formatTitle.mjs`
- **Change:** Added `'title'` mode to `formatTitle` function (line 4)
- **Verification:** `node --test bench-targets/feature/formatTitle.test.mjs` passed (1 test, 0 failures)
- **All modes confirmed:** `upper` → `"HELLO WORLD"`, `lower` → `"hello world"`, `title` → `"Hello Benchmark World"`
