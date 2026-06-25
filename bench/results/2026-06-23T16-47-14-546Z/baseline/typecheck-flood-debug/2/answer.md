**Fix Summary:**

**Root Cause:** `bench-targets/typecheck-flood/src/schema.mjs` was missing `'email'` from the `userFields` array, causing the typecheck script to repeatedly emit 60 errors about missing required fields.

**Fix Applied:**
- **File:** `bench-targets/typecheck-flood/src/schema.mjs`
- **Change:** Added `'email'` to the `userFields` array
- **Before:** `export const userFields = ['id', 'name']`
- **After:** `export const userFields = ['id', 'name', 'email']`

**Verification:**
```
$ node typecheck.mjs
$ exit code: 0  (success, no errors)
```
