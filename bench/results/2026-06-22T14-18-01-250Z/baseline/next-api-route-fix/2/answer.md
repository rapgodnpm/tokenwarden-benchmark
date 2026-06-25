Fixed validation and error handling in route.mjs by adding try/catch around `request.json()` for malformed JSON (400) and validating required `name` field (400). All tests pass.
