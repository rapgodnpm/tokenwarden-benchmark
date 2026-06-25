The issue is clear: `math.mjs` line 2 returns `a - b` when it should return `a + b`. This causes all 80 test cases to fail since the test expects `index + 2`.










## Summary

**Root cause:** In `bench-targets/large-log/src/math.mjs`, line 2 returns `a - b` when the function name and tests expect addition.

**Fix applied:** Changed `return a - b` to `return a + b` in `bench-targets/large-log/src/math.mjs` (lines 2).

**Verification status:** ✓ PASS - All 80 test cases pass with `node --test bench-targets/large-log/math.test.mjs`.
