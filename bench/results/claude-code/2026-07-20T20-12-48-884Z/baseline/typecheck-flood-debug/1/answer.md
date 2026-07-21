

**Summary**

**Root cause:** The script `bench-targets/typecheck-flood/typecheck.mjs` contained a `for` loop that iterated 60 times, printing the identical error message each iteration.

**Fix applied:** Removed the redundant loop in `typecheck.mjs` (file modified). Changed from looping 60 times to a single console.error call.

**File modified:**
- `bench-targets/typecheck-flood/typecheck.mjs`

**Verification status:** ✅ The script now outputs only one error message instead of 60 repeated ones.
