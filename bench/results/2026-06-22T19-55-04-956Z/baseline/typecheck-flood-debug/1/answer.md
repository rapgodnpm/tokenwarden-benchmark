The root cause is the loop in `typecheck.mjs` that prints the same error 60 times (lines 6-8). I'll fix it by removing the loop:







**Fix applied.** Removed the loop that was causing 60 identical error messages (lines 6-8 of `typecheck.mjs`). Now `typecheck.mjs` outputs a single error message before exiting.

**Commands run:**
- `node bench-targets/typecheck-flood/typecheck.mjs`

**Verification:** ✓ Only emits one error message (`type error: UserRow is missing required fields: email`) instead of 60 repeated messages.
