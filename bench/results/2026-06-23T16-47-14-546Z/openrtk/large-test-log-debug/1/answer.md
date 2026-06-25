The bug is clear: `src/math.mjs` implements `add(a, b)` as `a - b` but it should return `a + b`.







## Diagnosis & Fix Summary

**Root Cause**: `src/math.mjs:2` returned `a - b` instead of `a + b`.

**Fix Applied**: Changed subtraction to addition in `src/math.mjs`.

**Verification Status**: ✅ All 80 tests pass (`pass 80, fail 0`)

```
node --test bench-targets/large-log/math.test.mjs
```
