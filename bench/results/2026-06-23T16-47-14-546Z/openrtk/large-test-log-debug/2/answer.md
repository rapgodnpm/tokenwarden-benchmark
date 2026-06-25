**Diagnosis:**
- `math.mjs` had typo: `return a - b` should be `return a + b`
- Test expects `add(index, 2)` to return `index + 2`

**Fix:**
- Changed `return a - b` to `return a + b` in `bench-targets/large-log/src/math.mjs:1-3`

**Verification:**
```bash
node --test bench-targets/large-log/math.test.mjs
```
Status: ✓ All 80 tests pass in 52.44ms (80 pass, 0 fail)
