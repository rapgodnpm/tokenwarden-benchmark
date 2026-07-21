

All tests pass.

## Summary

**Fixed file:** `/private/tmp/tokenwarden-bench/claude-code/2026-07-20T20-12-48-884Z/rtk-next-api-route-fix-1/repo/bench-targets/next-api/app/api/users/route.mjs`

**Changes made:**
1. Added `try-catch` block around `await request.json()` to catch malformed JSON and return HTTP 400
2. Added validation for `body.name` field - returns HTTP 400 if missing
3. Fixed variable scoping by declaring `let body` before the try block

**Verification status:** ✅ All 2 tests pass
