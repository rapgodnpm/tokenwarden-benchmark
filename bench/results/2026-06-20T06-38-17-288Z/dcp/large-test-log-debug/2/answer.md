I'll diagnose and fix the failing noisy test suite. Let me start by reading the relevant files and understanding the context.






The test file exists but the source file doesn't. Let me explore the repository structure:




Found it now. Let me read both files and run the test:





**Diagnosis:** The source file `bench-targets/large-log/src/math.mjs` exports `add(a, b)` as `a - b` (subtraction), but the test expects `index + 2` (addition). This is a bug where the `add` function is performing subtraction instead of addition.

**Fix:** Change `-` to `+` on line 2:







**Verification: PASSED** ✓

All 80 tests pass after changing the operator from `-` to `+`.

---

## Summary

**Root cause:** `bench-targets/large-log/src/math.mjs:2` had `return a - b` (subtraction) but should return `a + b` (addition).

**Fixed:** Changed line 2 from `return a - b` to `return a + b`.

**Commands run:**
```bash
node --test bench-targets/large-log/math.test.mjs
```

**Result:** 80 tests pass, 0 fail.
