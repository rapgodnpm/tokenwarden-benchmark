

---

## Summary

**Root cause**: `typecheck.mjs` contained a `for` loop that printed the same error message 60 times.

**Fix**: Removed the redundant loop (lines 6-8), keeping only a single `console.error()` call.

**File changed**: `bench-targets/typecheck-flood/typecheck.mjs`

**Verification status**: The typecheck now outputs exactly one error message (plus the original `email` field error, which is the intended semantic issue).
