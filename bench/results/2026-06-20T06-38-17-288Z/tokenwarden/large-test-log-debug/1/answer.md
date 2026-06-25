The root cause is a bug in line 2 of `math.mjs`: it returns `a - b` but the test expects addition (`index + 2`). The test is correctly asserting `add(index, 2) === index + 2`, but the implementation subtracts instead of adds.







Fixed and verified.

**Issue:** `bench-targets/large-log/src/math.mjs:2` returns `a - b` instead of `a + b`.
**Fix:** Changed `-` to `+` in the `add` function.
**Verification:** `node --test bench-targets/large-log/math.test.mjs` — 80 tests pass.
