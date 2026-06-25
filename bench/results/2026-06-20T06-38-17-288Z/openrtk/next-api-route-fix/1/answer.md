The current route has two issues:
1. No handling for malformed JSON (will throw exception on `request.json()`)
2. Missing validation for `body.name` field (required by test case 2)







Fixed validation and error handling in [`route.mjs`](bench-targets/next-api/app/api/users/route.mjs):
- Added try/catch around `request.json()` to return HTTP 400 for malformed JSON
- Added validation for `body.name` field (required)
- Kept original email validation and API response shape

Test status: **2/2 tests passed**
