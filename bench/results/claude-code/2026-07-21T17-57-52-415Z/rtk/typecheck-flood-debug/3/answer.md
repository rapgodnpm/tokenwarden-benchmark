

## Summary

**Root cause**: The `typecheck.mjs` checker emitted the same error 60 times via a loop (`for (let index = 0; index < 60; index += 1)`), causing noisy repeated errors.

**Fix applied**: Replaced the loop with a single `console.error` call.

**File changed**: `bench-targets/typecheck-flood/typecheck.mjs`

**Verification**: ✅ The script now exits with code 1 and emits **one error** instead of 60:
```
type error: UserRow is missing required fields: email
```
