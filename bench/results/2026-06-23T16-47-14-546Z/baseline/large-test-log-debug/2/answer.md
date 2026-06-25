**Diagnosis:** The `add` function in `bench-targets/large-log/src/math.mjs:2` was returning subtraction (`a - b`) instead of addition (`a + b`), causing all 80 tests to fail.

**Fix applied:** Changed line 2 from `return a - b` to `return a + b`.

---

**Verification Status:** PASS
- Command: `node --test bench-targets/large-log/math.test.mjs`
- Result: 80/80 tests pass
