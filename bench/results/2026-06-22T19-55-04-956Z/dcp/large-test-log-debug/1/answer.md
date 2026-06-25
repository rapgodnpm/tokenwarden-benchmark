**Diagnosis & Fix**

**Root cause:** `bench-targets/large-log/src/math.mjs:1-3` - the `add` function incorrectly used subtraction (`a - b`) instead of addition.

**Fix:** Changed line 2 from `return a - b` to `return a + b` in `bench-targets/large-log/src/math.mjs`.

**Verification status:** ✅ All 80 tests passing (`pass 80`, `fail 0`).
