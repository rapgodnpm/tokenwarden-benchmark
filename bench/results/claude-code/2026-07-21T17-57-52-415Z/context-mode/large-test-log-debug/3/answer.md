

## Summary

**Root cause:** In `bench-targets/large-log/src/math.mjs`, line 2, the `add` function incorrectly subtracts the arguments (`return a - b`) instead of adding them.

**Fix applied:**
- File: `bench-targets/large-log/src/math.mjs`
- Change: `return a - b` → `return a + b`

**Verification:**
```bash
node --test bench-targets/large-log/math.test.mjs
```

Result: **80 tests passing** (previously all 80 failing).
