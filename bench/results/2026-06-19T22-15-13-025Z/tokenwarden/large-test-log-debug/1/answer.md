I'll read the benchmark files to understand the issue, diagnose any problems, and fix the minimal root cause.





The issue is clear: **`bench-targets/large-log/src/math.mjs:2`** has a bug. The test expects `add(index, 2)` to return `index + 2`, but the implementation returns `a - b` (subtraction instead of addition).










Fixed. Changed `return a - b` to `return a + b` in **`bench-targets/large-log/src/math.mjs:2`**. All 80 tests pass now.
