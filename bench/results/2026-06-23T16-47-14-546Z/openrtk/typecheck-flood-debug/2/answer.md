I can see the issue. The `typecheck.mjs` file loops 60 times printing the same typecheck error. The fix is to emit just one error instead of repeating it 60 times.







**Fix verified.** The typecheck now emits a single error instead of 60 duplicates.

**Change summary:**
- File: `bench-targets/typecheck-flood/typecheck.mjs`
- Removed the `for` loop (lines 6-8) that repeated the error 60 times
- Changed from 60 iterations to a single `console.error` call
- Verification: Running `node bench-targets/typecheck-flood/typecheck.mjs` now produces exactly one error message: `type error: UserRow is missing required fields: email`
