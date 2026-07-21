

**Fixed** `/private/tmp/tokenwarden-bench/claude-code/2026-07-20T20-12-48-884Z/caveman-next-api-route-fix-1/repo/bench-targets/next-api/app/api/users/route.mjs`:
1. Added try-catch for `request.json()` to return 400 on malformed JSON
2. Added validation for `name` field to require it, return 400 if missing

**Verification:** `node --test bench-targets/next-api/route.test.mjs` passed 2/2 tests.
