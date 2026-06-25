The bug is clear: `math.mjs` line 2 returns `a - b` but the tests on line 7 expect `a + b`. Let me run the test to verify, then fix it.













**Summary**

**Fix:** `bench-targets/large-log/src/math.mjs:2` - Changed `return a - b` to `return a + b`

**Commands run:**
```bash
node --test bench-targets/large-log/math.test.mjs
```

**Verification status:** ✅ Passing (0 failures, 80 tests passing)
