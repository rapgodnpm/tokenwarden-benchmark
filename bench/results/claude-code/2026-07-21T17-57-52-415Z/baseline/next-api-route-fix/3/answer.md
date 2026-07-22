

All tests pass. Here's the summary:

**File edited:** `/private/tmp/tokenwarden-bench/claude-code/2026-07-21T17-57-52-415Z/baseline-next-api-route-fix-3/repo/bench-targets/next-api/app/api/users/route.mjs`

**Changes made:**
1. Added `let body` declaration outside the try/catch to maintain scope
2. Wrapped `request.json()` in try/catch to return HTTP 400 for malformed JSON
3. Added validation for `body.name` (must exist) to return HTTP 400 if missing

**Verification:**
```
node --test bench-targets/next-api/route.test.mjs
```
- 2 tests, 2 passed, 0 failed
