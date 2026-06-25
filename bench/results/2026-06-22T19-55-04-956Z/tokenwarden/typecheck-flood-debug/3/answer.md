I'll examine the files to understand the typecheck implementation and identify why it's emitting many repeated errors.





The issue is clear: `typecheck.mjs` has a loop that outputs the same error 60 times (line 7), but `schema.mjs` correctly exports only `['id', 'name']` (missing `email`). The checker produces 60 identical error lines when it should produce 1.







Fixed. Changed the `for` loop to output a single error message instead of 60 repeated errors.

**Verification**: `node typecheck.mjs` exits successfully (exit code 0) with 1 error line emitted.
