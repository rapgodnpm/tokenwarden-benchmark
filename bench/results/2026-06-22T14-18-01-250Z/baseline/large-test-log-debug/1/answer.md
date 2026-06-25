**Diagnostic:** The `add` function in `src/math.mjs` incorrectly returns `a - b` when it should return `a + b`, causing all 80 test cases to fail.

**Fix:** Changed line 2 in `bench-targets/large-log/src/math.mjs` from `return a - b` to `return a + b`.

**Verification:** All 80 tests now pass.
