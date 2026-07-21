

Fixed `/private/tmp/tokenwarden-bench/claude-code/2026-07-20T20-12-48-884Z/caveman-next-api-route-fix-2/repo/bench-targets/next-api/app/api/users/route.mjs`:
- Added try/catch around `request.json()` to return 400 on malformed JSON
- Added `name` field validation returning 400 if missing

Tests pass (2/2).
