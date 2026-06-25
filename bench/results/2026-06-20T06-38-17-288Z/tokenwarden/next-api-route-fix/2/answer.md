Fixed validation and error handling in `/private/tmp/tokenwarden-bench/2026-06-20T06-38-17-288Z/tokenwarden-next-api-route-fix-2/repo/bench-targets/next-api/app/api/users/route.mjs`:

1. Added try/catch around `request.json()` to return 400 on malformed JSON
2. Added validation for `body.name` required field
3. Combined email validation logic

All 2 tests pass.
