**Root cause:** The loop used `let index = 0; index += 1` inside the for-loop body to create a variable with the same name as the loop variable, causing multiple declarations of `index` and 60 repeated errors.

**Fix:** Removed the redundant loop and changed `let index` to a single `console.error` call.

**Files changed:**
- `bench-targets/typecheck-flood/typecheck.mjs`

**Verification:** ✅ Node execution now outputs a single error message instead of 60 duplicates.
