

**Fix Applied:**

- **File:** `bench-targets/typecheck-flood/typecheck.mjs`
- **Change:** Replaced the loop (`for (let index = 0; index < 60; index += 1)`) with a single `console.error()` call (line 6).

**Verification Status:**

Before: 60 repeated error messages
After: Single error message

```
$ node bench-targets/typecheck-flood/typecheck.mjs
type error 0: UserRow is missing required fields: email
```
