**Fix applied and verified:**
- **Root cause:** `bench-targets/large-log/src/math.mjs:2` returns `a - b` but test expects `add` to return `a + b`
- **Fix:** Changed `return a - b` to `return a + b` in [`bench-targets/large-log/src/math.mjs:2`](bench-targets/large-log/src/math.mjs:2)
- **Result:** All 80 tests pass (pass 80, fail 0)
