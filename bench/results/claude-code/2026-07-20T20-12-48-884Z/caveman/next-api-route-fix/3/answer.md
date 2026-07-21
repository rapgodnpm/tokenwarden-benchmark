

Fixed `/private/tmp/tokenwarden-bench/claude-code/2026-07-20T20-12-48-884Z/caveman-next-api-route-fix-3/repo/bench-targets/next-api/app/api/users/route.mjs`:
- Added try/catch around `request.json()` to return 400 on malformed JSON
- Added validation for required `name` field

Test command: `node --test bench-targets/next-api/route.test.mjs`

Status: 2/2 tests pass
