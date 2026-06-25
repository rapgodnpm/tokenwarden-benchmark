Fixed validation in `bench-targets/next-api/app/api/users/route.mjs`:
- Added try-catch around `request.json()` to catch malformed JSON and return 400
- Added required field validation for `name` alongside existing email validation
- All 2 tests pass
