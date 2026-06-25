The bug is in `math.mjs:2` - the `add` function returns `a - b` (subtraction) instead of `a + b` (addition). The test expects addition behavior.







Fixed.

- **Issue**: `bench/targets/large-log/src/math.mjs` had `return a - b` instead of `return a + b`
- **Fix**: Changed `-` to `+` on line 2
- **Verification**: All 80 tests pass with `node --test bench-targets/large-log/math.test.mjs` - output shows all cases passing (ok 1-80)
