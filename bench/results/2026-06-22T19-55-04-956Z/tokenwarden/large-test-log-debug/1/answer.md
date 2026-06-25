I'll read both files to diagnose the issue, then fix the minimal root cause.





The bug is clear: the `add` function returns `a - b` but the tests expect `add(index, 2)` to return `index + 2`. I'll fix the operator:







Fix verified: all tests passing.

**Diagnosis:** `add` function had wrong operator (`return a - b` instead of `a + b`)
**Fix:** Changed `-` to `+` in `/private/tmp/tokenwarden-bench/2026-06-22T19-55-04-956Z/tokenwarden-large-test-log-debug-1/repo/bench-targets/large-log/src/math.mjs:2`
**Verification:** `node --test` shows all 80 tests passing (ok 1 through 80)
