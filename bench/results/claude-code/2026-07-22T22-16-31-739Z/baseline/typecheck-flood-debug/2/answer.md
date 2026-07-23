

## Summary

### Root Cause
The file `bench-targets/typecheck-flood/typecheck.mjs` contained a `for` loop that ran 60 times, emitting the identical error message repeatedly:

```javascript
if (missing.length) {
  for (let index = 0; index < 60; index += 1) {
    console.error(`type error ${index}: UserRow is missing required fields: ${missing.join(', ')}`)
  }
  process.exit(1)
}
```

### Fix Applied
Removed the loop to emit the error only once:

**File:** `bench-targets/typecheck-flood/typecheck.mjs`
- **Change:** Deleted lines 6-7 (the loop) and kept the error message outside the loop

### Verification Status
**Command:** `node bench-targets/typecheck-flood/typecheck.mjs`

**Before fix:** 60 repeated error messages  
**After fix:** Single error message

```
Exit code 1
type error: UserRow is missing required fields: email
```

The fix is minimal (deleted 2 lines), and the semantic behavior is preserved (still exits with code 1 and reports the error).
