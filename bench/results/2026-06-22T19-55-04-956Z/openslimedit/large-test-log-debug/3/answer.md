**Diagnosis:** The `add` function in `bench-targets/large-log/src/math.mjs` was implemented incorrectly, subtracting instead of adding.

**Fix:** Changed `return a - b` to `return a + b` in `bench-targets/large-log/src/math.mjs:2`.

**Verification:** 80 tests, pass 80.
