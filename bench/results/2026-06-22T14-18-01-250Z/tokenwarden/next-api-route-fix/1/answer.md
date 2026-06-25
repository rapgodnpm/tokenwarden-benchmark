I need to fix the route to:
1. Handle malformed JSON (return 400)
2. Validate required fields (email and name)
3. Return appropriate error status codes













**Fixed** `/private/tmp/tokenwarden-bench/2026-06-22T14-18-01-250Z/tokenwarden-next-api-route-fix-1/repo/bench-targets/next-api/app/api/users/route.mjs`:

- Added try/catch around `request.json()` to return HTTP 400 for malformed JSON
- Added validation for `body.name` (required field) returning HTTP 400
- Tests: ✅ All 2 tests pass
