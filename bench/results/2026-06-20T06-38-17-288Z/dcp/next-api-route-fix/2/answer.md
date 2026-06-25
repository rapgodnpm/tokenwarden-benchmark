File: `bench-targets/next-api/app/api/users/route.mjs`

Added error handling for validation:
- Wrapped `await request.json()` in try-catch to return 400 on malformed JSON
- Added required field validation for `body.name` to return 400 if missing
- Changed `const` to `let` to handle the async parsing result

All tests pass (2/2).
