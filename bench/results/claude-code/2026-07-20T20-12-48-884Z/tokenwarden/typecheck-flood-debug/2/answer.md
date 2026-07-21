

**Fix Applied**

| File | Change |
|------|--------|
| `bench-targets/typecheck-flood/typecheck.mjs` | Removed the `for` loop that repeated the error 60 times; changed to emit a single error message |

**Verification Status:** ✅ Passed

**Before:** 60 repeated error messages (indices 0-59)  
**After:** Single error message

```
type error: UserRow is missing required fields: email
Exit code: 1
```

The root cause was the `for (let index = 0; index < 60; index += 1)` loop in the error emission block. The fix is the minimal change - removing the loop while preserving the error detection and exit behavior.
