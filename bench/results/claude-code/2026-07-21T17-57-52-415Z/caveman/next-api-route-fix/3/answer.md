

File: `/private/tmp/tokenwarden-bench/claude-code/2026-07-21T17-57-52-415Z/caveman-next-api-route-fix-3/repo/bench-targets/next-api/app/api/users/route.mjs`

Changes:
- Added try/catch around `request.json()` to return 400 on malformed JSON
- Added `!body.name` check to enforce required field
- Fixed variable scope by declaring `body` before try block

Verification: `node --test bench-targets/next-api/route.test.mjs` passes (2/2 tests).
