

All tests pass.

## Summary

**File edited:** `/private/tmp/tokenwarden-bench/claude-code/2026-07-20T20-12-48-884Z/context-mode-next-api-route-fix-3/repo/bench-targets/next-api/app/api/users/route.mjs`

**Changes:**
1. Wrapped `request.json()` in a try-catch block to handle malformed JSON, returning HTTP 400
2. Added validation for `body.name` requiring it to be present (missing name returns HTTP 400)

**Verification:**
```bash
node --test bench-targets/next-api/route.test.mjs
```
- All 2 tests pass (was 0 passing before the fix)
