**Diagnosis:** The `add` function in `bench-targets/large-log/src/math.mjs` returned `a - b` instead of `a + b`, causing all 80 tests to fail (the test expects `add(index, 2) === index + 2`).

**Fix applied:** Changed `return a - b` to `return a + b` in `bench-targets/large-log/src/math.mjs:2`.

**Verification:** `node --test bench-targets/large-log/math.test.mjs` - **PASSED** (80 tests, 0 fail)
