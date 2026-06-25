The issue is clear: `src/math.mjs:2` returns `a - b` but should return `a + b`. Let me verify with the test command first, then fix it.




Confirmed - `a - b` returns `-2` when test expects `2`. Fix the operator:










**Verification: PASSED** ✅ (all 80 tests pass)

**Root cause:** `bench-targets/large-log/src/math.mjs:2` had `return a - b` instead of `return a + b`

**Fix applied:** Changed `- b` to `+ b` in `bench-targets/large-log/src/math.mjs:2`

**Commands run:**
```
node --test bench-targets/large-log/math.test.mjs  # before fix: 80 failures
node --test bench-targets/large-log/math.test.mjs  # after fix: 0 failures
```
