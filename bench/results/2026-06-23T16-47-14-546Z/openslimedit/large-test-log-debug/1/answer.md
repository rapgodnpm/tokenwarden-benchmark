The bug is clear: `add` returns `a - b` instead of `a + b`.










**Verification status:** ✅ All 80 tests pass

**Summary:**
- **Root cause:** `bench-targets/large-log/src/math.mjs:2` returned `a - b` instead of `a + b`
- **Fix:** Changed `return a - b` to `return a + b`
- **File path:** `bench-targets/large-log/src/math.mjs`

**Commands run:**
```bash
node --test bench-targets/large-log/math.test.mjs
```

**Result:** 80 tests pass, 0 fail.
