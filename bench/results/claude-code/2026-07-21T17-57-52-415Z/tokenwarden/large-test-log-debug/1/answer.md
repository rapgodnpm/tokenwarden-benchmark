

## Diagnosis and Fix Complete

**Root Cause:** The `add` function in `src/math.mjs` was subtracting instead of adding.

**File Changed:**
- `/repo/bench-targets/large-log/src/math.mjs`

**Fix Applied (line 2):**
```diff
- return a - b
+ return a + b
```

**Verification:**
```
$ node --test bench-targets/large-log/math.test.mjs

# tests 80
# suites 0
# pass 80
# fail 0
```

All 80 tests now pass.
