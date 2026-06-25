The issue is clear: `typecheck.mjs` loops 60 times printing the same error, creating 60 repeated errors. The root cause is the `for (let index = 0; index < 60; index += 1)` loop that just repeats the same error message.

**Fix:** Remove the loop repetition - just print the error once:







**Verification passed:** Now outputs a single error `"type error: UserRow is missing required fields: email"` (not 60 duplicates). Exit code 1 reflects the expected failure state.

**Fix applied:** `/bench-targets/typecheck-flood/typecheck.mjs:6` - removed the `for (let index = 0; index < 60; index += 1)` loop. Changed to emit the error once.
