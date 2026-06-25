Fixed: Changed `return a - b` to `return a + b` in `bench-targets/large-log/src/math.mjs:2`.

**Diagnosis**: The `add` function was incorrectly using subtraction (`a - b`) instead of addition (`a + b`). The test expects `add(index, 2)` to return `index + 2`, but the function returned `index - 2`.

**Verification**: All 80 tests now pass.

**Commands run**:
```bash
node --test bench-targets/large-log/math.test.mjs  # Initially failed all 80 tests
```
