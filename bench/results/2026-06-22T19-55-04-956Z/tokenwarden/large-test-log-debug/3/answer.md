The `add` function returns `a - b` but the tests expect `a + b`. This is a clear implementation bug.







**Verification passed.** All 80 test cases now pass (TAP format shows `ok` for every test).

**Root cause:** The `add` function in `math.mjs:2` returned `a - b` instead of `a + b`.

**Fix:** Changed `-` to `+` in `bench-targets/large-log/src/math.mjs:2`
