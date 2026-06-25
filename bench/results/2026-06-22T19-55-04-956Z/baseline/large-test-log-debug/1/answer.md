## Diagnosis

**Root cause:** In `bench-targets/large-log/src/math.mjs:2`, the `add` function incorrectly uses subtraction (`return a - b`) instead of addition.

**Fix:** Changed `return a - b` to `return a + b` (1 character: `-` → `+`).

**Verification:** Fixed and passed all 80 tests (80 pass, 0 fail).

---

**Status: ✓ Pass**
