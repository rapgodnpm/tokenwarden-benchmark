I'll examine the source and test files to understand the issue causing noisy failing tests.





The source file has a bug: `add` subtracts `a - b` instead of adding `a + b`. The test expects `a + b`. I'll run the test to confirm the failure, then fix the source file.







The test shows 80 failures, all with the same root cause: the `add` function on line 2 uses subtraction (`-`) instead of addition (`+`). I'll fix it with the minimal edit:







**Summary**

**Diagnosis:** The `add` function in `bench-targets/large-log/src/math.mjs:2` incorrectly implements addition with subtraction (`a - b` instead of `a + b`), causing all 80 tests to fail with `Expected values to be strictly equal: <expected sum> !== <actual difference>`.

**Fix:** Changed `return a - b` to `return a + b` in `bench-targets/large-log/src/math.mjs:2`

**Verification:** ✓ `node --test bench-targets/large-log/math.test.mjs` passes all 80 tests (pass 80, fail 0)
