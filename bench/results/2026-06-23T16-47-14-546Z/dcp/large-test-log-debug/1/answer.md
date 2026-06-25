The bug is clear: `math.mjs` implements subtraction (`a - b`) but the test expects addition (`a + b`).







**Verification Status: ✅ All 80 tests pass**

**Summary:**
- **Root cause:** `bench-targets/large-log/src/math.mjs:2` had `return a - b` instead of `return a + b`
- **Fix:** Changed subtraction to addition in `/private/tmp/tokenwarden-bench/2026-06-23T16-47-14-546Z/dcp-large-test-log-debug-1/repo/bench-targets/large-log/src/math.mjs`
- **Verification:** `node --test bench-targets/large-log/math.test.mjs` - 80 pass, 0 fail
