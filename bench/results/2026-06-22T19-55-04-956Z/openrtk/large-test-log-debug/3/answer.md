The math.mjs file has a bug: the `add` function returns `a - b` instead of `a + b`. The tests expect addition but get subtraction.




Fix:







Summary:
- File edited: `bench-targets/large-log/src/math.mjs`
- Change: Line 2, `return a - b` → `return a + b`
- Root cause: The `add` function was performing subtraction instead of addition
- Verification: `node --test bench-targets/large-log/math.test.mjs` now passes (80 pass, 0 fail)
