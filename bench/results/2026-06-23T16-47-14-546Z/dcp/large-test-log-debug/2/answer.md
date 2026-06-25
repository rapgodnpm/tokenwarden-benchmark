The bug is clear: `math.mjs` line 2 returns `a - b` but it should return `a + b` to match the test expectation `index + 2`.










**Diagnosis and fix complete:**

**Root cause:** `bench-targets/large-log/src/math.mjs:2` returned `a - b` instead of `a + b` - the `add()` function was performing subtraction.

**Fix applied:** Changed `return a - b` to `return a + b` in `bench-targets/large-log/src/math.mjs:2`.

**Verification status:** ✅ All 80 tests now pass.
