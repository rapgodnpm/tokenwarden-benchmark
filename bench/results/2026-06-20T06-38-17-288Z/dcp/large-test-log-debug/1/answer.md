The issue is clear: `src/math.mjs:2` has `return a - b` but should be `return a + b` to match the test expectations.







**Diagnosis:** `bench-targets/large-log/src/math.mjs:2` returns `a - b` instead of `a + b`, causing all 80 tests to fail.

**Fix:** Changed `return a - b` to `return a + b` in `/private/tmp/tokenwarden-bench/2026-06-20T06-38-17-288Z/dcp-large-test-log-debug-1/repo/bench-targets/large-log/src/math.mjs`

**Verification:** `node --test bench-targets/large-log/math.test.mjs` passes all 80 tests.
