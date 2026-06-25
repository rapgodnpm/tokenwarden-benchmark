Fixed validation and error handling in [`bench-targets/next-api/app/api/users/route.mjs`](bench-targets/next-api/app/api/users/route.mjs):

1. **Malformed JSON handling**: Wrapped `request.json()` in a `.catch()` to return HTTP 400
2. **Required fields validation**: Added checks for `email` (must be string with @) and `name` (must be string), returning HTTP 400 for missing fields
3. **Valid payloads**: Return HTTP 201 as before

Verification status: **All 2 tests passed** 🟢
