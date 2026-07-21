

All tests pass. Here's the summary:

**Fixed file:** `/private/tmp/tokenwarden-bench/claude-code/2026-07-20T20-12-48-884Z/context-mode-next-api-route-fix-1/repo/bench-targets/next-api/app/api/users/route.mjs`

**Changes made:**
1. Added `try/catch` around `request.json()` to catch malformed JSON and return HTTP 400
2. Declared `body` as a `let` variable outside the try block to avoid scoping issues
3. Added validation for the required `name` field

**Verification:** `node --test bench-targets/next-api/route.test.mjs` - **2 tests passed**
