Root cause found: `math.mjs:2` has `return a - b` instead of `return a + b`. The tests expect `add` to add, but it subtracts.







**Verification Status: PASS** (80/80 tests)

Final answer:
- **Root cause**: `bench-targets/large-log/src/math.mjs:2` had `return a - b` (subtraction) instead of `return a + b`
- **Fix**: Changed `-` to `+` on line 2
- **Verification**: `node --test bench-targets/large-log/math.test.mjs` now passes all 80 tests
