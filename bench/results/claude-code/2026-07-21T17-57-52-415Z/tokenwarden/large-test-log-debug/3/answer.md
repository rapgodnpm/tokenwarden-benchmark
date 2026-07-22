

## Summary

**Root Cause:** The `add` function in `bench-targets/large-log/src/math.mjs` incorrectly subtracts instead of adds.

**Fix:** Changed `return a - b` to `return a + b` on line 2.

**Verification Status:** All 80 tests now pass.

---

### Exact File Path
- `bench-targets/large-log/src/math.mjs`

### Commands Run
```bash
node --test bench-targets/large-log/math.test.mjs
```

### Before Fix
```
# tests 80
# suites 0
# pass 0
# fail 80
```

### After Fix
```
# tests 80
# suites 0
# pass 80
# fail 0
```
