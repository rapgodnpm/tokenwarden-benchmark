

## Summary

| Item | Value |
|------|-------|
| **Diagnosis** | `add` function returned `a - b` but tests expected `a + b` |
| **Root cause** | `/bench-targets/large-log/src/math.mjs` line 2: `return a - b` |
| **Fix** | Changed `return a - b` to `return a + b` |
| **Command run** | `node --test bench-targets/large-log/math.test.mjs` |
| **Verification** | ✅ All 80 tests pass |
