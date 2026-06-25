Fixed validation and error handling in `bench-targets/next-api/app/api/users/route.mjs`:
- Added try-catch around `request.json()` to return HTTP 400 for malformed JSON
- Added validation for missing required `name` field (returns 400)

Verification: All tests pass (2/2).
