Let me run the typecheck to see the actual errors:




The root cause: `userFields = ['id', 'name']` is missing `'email'` which is required. The fix is to add `'email'` to the schema.










**Fix Complete**

**Root cause:** `schema.mjs` had `userFields = ['id', 'name']` but `required` included `'email'`, causing 60 repeated error messages.

**Fix:** Added `'email'` to `userFields` in `src/schema.mjs`.

**Verification:**
- Command: `node bench-targets/typecheck-flood/typecheck.mjs`
- Result: Exit code 0 (no errors)
