The `add` function incorrectly returns `a - b` instead of `a + b`. Let me fix this and run the tests:







**Summary**

**Root cause:** `bench-targets/large-log/src/math.mjs` line 2 returned `a - b` but was named `add` (tests expect addition).

**Fix:** Changed `return a - b` to `return a + b` in `bench-targets/large-log/src/math.mjs`

**Verification status:** All 80 tests pass
