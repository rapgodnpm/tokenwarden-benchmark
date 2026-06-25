All 2 tests pass. Fixed the route to:
- Catch JSON parsing errors and return 400 for malformed JSON
- Validate required fields (email with @ and name) before returning 201
