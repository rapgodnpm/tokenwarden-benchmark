

**Fix Summary:**

| Item | Details |
|------|---------|
| **Root cause** | `typecheck.mjs` loop (lines 6-8) logging the same error 60 times |
| **File changed** | `bench-targets/typecheck-flood/typecheck.mjs` |
| **Change** | Removed `for` loop; error now logged once |
| **Verification** | `exit code: 1` with single error message: `UserRow is missing required fields: email` |

The typechecker still correctly identifies the missing `email` field, but no longer floods with repeated errors.
