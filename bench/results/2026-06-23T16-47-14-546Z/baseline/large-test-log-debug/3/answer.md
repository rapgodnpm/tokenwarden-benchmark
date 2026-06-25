**Diagnosis:**  
`bench-targets/large-log/src/math.mjs:2` had `return a - b` instead of `return a + b`. The function was named `add` but performed subtraction, causing all 80 tests to fail.

**Fix applied:**  
Changed line 2 in `bench-targets/large-log/src/math.mjs` from `return a - b` to `return a + b`.

**Verification:**  
```
node --test bench-targets/large-log/math.test.mjs
# tests 80
# pass 80
# fail 0
```
