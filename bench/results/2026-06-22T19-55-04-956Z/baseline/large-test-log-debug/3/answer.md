The bug is clear: the `add` function in `math.mjs` returns `a - b` instead of `a + b`. Fixing this should make the tests pass.







**Verification status: PASS**

- **Root cause:** `add` function used subtraction (`a - b`) instead of addition (`a + b`).
- **File changed:** `bench-targets/large-log/src/math.mjs`
- **Fix:** Changed `return a - b` to `return a + b` (1 char changed: `-` → `+`)
- **Result:** All 80 tests pass
