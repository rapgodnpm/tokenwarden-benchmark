Root cause: typecheck.mjs line 6 loops 60 times printing the same error. Fix: Remove the loop and output the error once.







Fixed by replacing the 60-error loop (lines 6-8) with a single console.error call.

**Verification:** Running `node typecheck.mjs` now emits only 1 error (was 60):
```
type error: UserRow is missing required fields: email
```

---
*Files changed: bench-targets/typecheck-flood/typecheck.mjs*
