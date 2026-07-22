

**Fix verified.** 

The root cause was a `for` loop in `typecheck.mjs` that repeated the same error 60 times. The fix removes this flooding loop, printing the error once instead.

**Changes made:**
- File: `bench-targets/typecheck-flood/typecheck.mjs`
- Removed the `for (let index = 0; index < 60; index += 1)` loop (lines 6-8)
- Simplified to a single `console.error` call

**Verification:**
```
$ node bench-targets/typecheck-flood/typecheck.mjs 2>&1
UserRow is missing required fields: email
Exit code: 1
```

Before: 60 repeated error lines
After: Single error line (same exit code, now no flooding)
