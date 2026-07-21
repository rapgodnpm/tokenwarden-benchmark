

**Diagnosis & Fix**

**Root Cause**: `bench-targets/large-log/src/math.mjs:2` had a bug where `add` was implemented as subtraction (`a - b`) instead of addition.

**Fix**: Changed `a - b` to `a + b` in the return statement.

**Commands Run & Verification**:
```bash
node --test bench-targets/large-log/math.test.mjs
```

**Result**: ✅ All 80 tests pass (`pass 80`, `fail 0`).
