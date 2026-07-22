

## Summary

**Issue**: The `add` function in `bench-targets/large-log/src/math.mjs` was implementing subtraction (`a - b`) instead of addition (`a + b`).

**Fix**: Changed line 2 from `return a - b` to `return a + b`.

**Verification**: All 80 tests pass (`pass 80, fail 0`).

**Commands run**:
1. `node --test bench-targets/large-log/math.test.mjs` (diagnosis - showed failures)
2. Edit to fix the operator
3. `node --test bench-targets/large-log/math.test.mjs` (verification - all pass)
