Root cause: `bench-targets/large-log/src/math.mjs:2` has `return a - b` instead of `return a + b`.







Fixed.

**Summary**
- Root cause: `bench-targets/large-log/src/math.mjs:2` had `return a - b` (subtraction) instead of `return a + b`
- Fix: Changed `-` to `+` on line 2
- Verification: `node --test bench-targets/large-log/math.test.mjs` shows 80 passed, 0 failed
