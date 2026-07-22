

**Root cause:** `typecheck.mjs` loops 60 times printing identical error.

**Fix:** Removed `for` loop, now prints error once.

**Verification:** Single error output, no repetition.
