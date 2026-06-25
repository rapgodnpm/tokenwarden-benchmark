The bug is in `src/math.mjs:2` - the function returns `a - b` but `add` should return `a + b`.







**Diagnosis:** `src/math.mjs:2` had `a - b` instead of `a + b` in the `add` function.

**Fix:** Changed `return a - b` to `return a + b`

**Verification:**
```
node --test bench-targets/large-log/math.test.mjs
# tests 80 # pass 80 # fail 0
```
