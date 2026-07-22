

## Summary

**Root Cause:** `bench-targets/typecheck-flood/typecheck.mjs` contains a loop (lines 6-8) that emits the same type error 60 times with only a counter prefix.

**Fix Applied:**
- **File:** `bench-targets/typecheck-flood/typecheck.mjs`
- **Change:** Removed the `for` loop at lines 6-8, keeping a single `console.error` call. The repeated index counter was stripped from the message.

**Verification Status:** ✅ Pass
```
$ node bench-targets/typecheck-flood/typecheck.mjs
type error: UserRow is missing required fields: email
Exit code: 1
```

The script now outputs exactly one error message instead of 60 repeated ones, while still correctly detecting the missing `email` field and exiting with code 1.
