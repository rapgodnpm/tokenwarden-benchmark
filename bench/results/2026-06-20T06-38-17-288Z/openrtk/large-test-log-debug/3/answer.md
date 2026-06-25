The `add` function in `math.mjs` returns `a - b` but should return `a + b` to match the test expectations. Let me run the test to verify the failures:










**Diagnosis & Fix:**

Root cause: `bench-targets/large-log/src/math.mjs:2` had `return a - b` instead of `return a + b`. The tests expect addition but the function performed subtraction. All 80 tests were failing because they're testing `add(index, 2)` which expects `index + 2`.

**Fix applied:**
- **File:** `bench-targets/large-log/src/math.mjs`
- **Line:** 2
- **Change:** `return a - b` → `return a + b`

**Verification:**
```
node --test bench-targets/large-log/math.test.mjs
```
Result: **80 passed, 0 failed**
