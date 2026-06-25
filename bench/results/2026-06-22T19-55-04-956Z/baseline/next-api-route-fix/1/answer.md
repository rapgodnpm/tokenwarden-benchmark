Fixed validation and error handling in `route.mjs`:

1. Added try/catch around `request.json()` to catch malformed JSON and return HTTP 400
2. Added validation for required `name` field - returns 400 if missing  
3. Valid payloads now correctly return HTTP 201

**Verification:** All tests pass (2/2)
