The `add` function returns `a - b` instead of `a + b`, while the test expects `a + b`.







**Fix applied to `bench-targets/large-log/src/math.mjs`:** Changed `a - b` to `a + b`.

**Verification:** 80/80 tests pass (`node --test bench-targets/large-log/math.test.mjs`).
