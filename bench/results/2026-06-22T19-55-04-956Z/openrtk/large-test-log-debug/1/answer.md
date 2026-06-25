I'll diagnose and fix the noisy failing test suite for the large-log benchmark.





The root cause is clear: the `add` function returns `a - b` (subtraction) but the test expects `index + 2` (addition).




Fixing the root cause - changing `-` to `+`:










Fixed.

**Summary:**
- **Root cause:** `bench-targets/large-log/src/math.mjs:2` defined `add(a, b)` as `return a - b` (subtraction) but the test expected `a + b`.
- **Fix:** Changed line 2 from `return a - b` to `return a + b`.
- **Verification:** All 80 tests now pass.

```bash
# Tests passing
# tests 80
# pass 80
# fail 0
```
