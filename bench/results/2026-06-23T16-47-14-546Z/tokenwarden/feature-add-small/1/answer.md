Now I need to add title case support. The test expects `'Hello Benchmark World'` from `'hello benchmark world'` with mode `'title'`. I'll implement title case and run the tests.







**Summary**
- Added title case mode to `<path>`, line 1-3: `'split'` into words, capitalize first character of each, then rejoin
- Run `node --test bench-targets/feature/formatTitle.test.mjs`: 1 test, 1 pass, 0 fail
