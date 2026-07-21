

## Summary

**Root cause:** The loop in `typecheck.mjs` was using a counter (`index` from 0 to 59) that was only printed in the error message, causing 60 duplicate error lines.

**Fix applied:**
- File: `bench-targets/typecheck-flood/typecheck.mjs`
- Removed the unnecessary `for` loop and replaced it with a single `console.error` call.

**Verification status:** ✅ Fixed. The script now outputs only one error line instead of 60.
