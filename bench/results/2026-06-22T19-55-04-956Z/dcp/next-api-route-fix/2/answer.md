Validation and error handling fixed in `bench-targets/next-api/app/api/users/route.mjs`:

- Added try/catch around `request.json()` to return HTTP 400 for malformed JSON
- Added validation for required fields (`email` and `name`) with HTTP 400 response
- Existing email format validation preserved
- Valid payloads return HTTP 201

All 2 tests pass.
