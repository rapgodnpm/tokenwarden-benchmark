The bug is clear: `add` is doing subtraction instead of addition. `math.mjs:2` returns `a - b` but the tests expect `a + b`.







**Summary:**

- **File:** `bench-targets/large-log/src/math.mjs`
- **Bug:** `add` function returned `a - b` instead of `a + b` (line 2)
- **Fix:** Changed `return a - b` to `return a + b`
- **Verification:** `node --test bench-targets/large-log/math.test.mjs` - 80 tests pass (was 0 pass, 80 fail)
