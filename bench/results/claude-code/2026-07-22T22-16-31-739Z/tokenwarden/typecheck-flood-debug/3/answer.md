

Fixed. 

**Root cause:** The `for` loop ran 60 times, printing the same error 60 times.

**Fix:** Changed `index < 60` to `index < 1` in `bench-targets/typecheck-flood/typecheck.mjs`.

**Verification status:** ✓ Script now outputs only a single error message.
