

**Fixed.**

**Root cause:** `bench-targets/large-log/src/math.mjs:2` — `add()` returns `a - b` instead of `a + b`.

**Fix:** Changed `-` to `+`.

**Verification:**
```bash
node --test bench-targets/large-log/math.test.mjs
```
Result: 80 tests pass, 0 fail.
