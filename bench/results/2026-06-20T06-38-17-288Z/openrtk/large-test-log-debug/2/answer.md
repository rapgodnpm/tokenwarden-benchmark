The issue is clear: `math.mjs` returns `a - b` but the test expects `a + b`. This is a simple bug in the implementation.







**Verification passed: All 80 tests passed (pass: 80, fail: 0).**

---

**File:** `bench-targets/large-log/src/math.mjs:2`

**Fix:** Changed `return a - b` to `return a + b`

**Root cause:** The `add` function performed subtraction instead of addition.
