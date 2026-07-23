

## Summary

**Root cause:** The `add` function in `bench-targets/large-log/src/math.mjs` used subtraction (`-`) instead of addition (`+`).

**Fix applied:** Changed line 2 from `return a - b` to `return a + b`

**Files modified:**
- `/work/tokenwarden-large-test-log-debug-3/repo/bench-targets/large-log/src/math.mjs`

**Verification status:** All 80 tests now pass.
