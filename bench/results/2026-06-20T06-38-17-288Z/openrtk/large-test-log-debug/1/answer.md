I'll start by reading the math implementation and test files to diagnose the issue.





The bug is clear: the `add` function returns `a - b` but the test expects `a + b`. Let me verify the test fails and then fix it.




Confirmed. Now fixing the bug by changing `return a - b` to `return a + b`:










**Fixed.** All 80 tests now pass.

**Diagnosis:** The `add` function in `bench-targets/large-log/src/math.mjs` returned `a - b` instead of `a + b`.

**Fix Applied:**
- File: `bench-targets/large-log/src/math.mjs:2`
- Changed: `return a - b` → `return a + b`

**Verification:** ✅ `node --test bench-targets/large-log/math.test.mjs` - 80 tests pass, 0 fail
