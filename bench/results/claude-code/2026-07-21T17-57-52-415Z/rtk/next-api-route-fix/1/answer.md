

All tests pass.

## Summary

**File edited:** `/private/tmp/tokenwarden-bench/claude-code/2026-07-21T17-57-52-415Z/rtk-next-api-route-fix-1/repo/bench-targets/next-api/app/api/users/route.mjs`

**Changes made:**
1. Added try-catch around `request.json()` to handle malformed JSON, returning HTTP 400
2. Added validation for missing `name` field, returning HTTP 400
3. Fixed scoping by declaring `body` with `let` before the try block so it's accessible after the catch

**Verification status:**
```
node --test bench-targets/next-api/route.test.mjs
```
Result: **2/2 tests passed**
