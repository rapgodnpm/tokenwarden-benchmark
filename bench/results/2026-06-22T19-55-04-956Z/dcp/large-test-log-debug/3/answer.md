**Diagnosis and Fix Summary:**

**Root cause:** A bug in `src/math.mjs` where `add()` returns `a - b` instead of `a + b` (line 2).

**Fix applied:** Changed `return a - b` to `return a + b` in `bench-targets/large-log/src/math.mjs:2`.

**Verification:** `node --test bench-targets/large-log/math.test.mjs` - **ALL 80 TESTS PASS** ✓
