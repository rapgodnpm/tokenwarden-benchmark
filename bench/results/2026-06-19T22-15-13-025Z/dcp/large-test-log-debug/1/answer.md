**Diagnosis and fix:**

- **Root cause:** `bench-targets/large-log/src/math.mjs` exports `add(a,b)` but returns `a - b` instead of `a + b`
- **Fix:** Changed `return a - b` to `return a + b` in `/private/tmp/tokenwarden-bench/2026-06-19T22-15-13-025Z/dcp-large-test-log-debug-1/repo/bench-targets/large-log/src/math.mjs:2`
- **Verification status:** ✓ All 80 tests pass

```
# tests 80
# pass 80
# fail 0
```
