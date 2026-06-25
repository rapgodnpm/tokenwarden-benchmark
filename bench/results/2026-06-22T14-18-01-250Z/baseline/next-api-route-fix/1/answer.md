Now I understand the issues:
1. **Malformed JSON**: The `POST` function calls `request.json()` without a try/catch, so it will throw an error instead of returning 400
2. **Missing required field**: Line 8 returns 201 when only `email` is provided - but `name` is also required (the test expects it)
3. **Error format**: Line 7 creates an error as `JSON.stringify({ error: 'invalid email' })` but the response should be an error object `{ message: 'Invalid email format' }`







**Fixes applied to** `bench-targets/next-api/app/api/users/route.mjs`:

1. **JSON parsing** - Added try/catch to handle malformed JSON throwing, returning 400 with `{ message: 'Invalid JSON' }`
2. **Email validation** - Kept validation for `@` in email, returns 400 with `{ message: 'Invalid email format' }`
3. **Required field** - Added check for `body.name`, returns 400 if missing with `{ message: 'Missing required field' }`

**Verification**: All 2 tests pass. API route shape preserved, malformed JSON and missing required fields return HTTP 400, valid payloads return HTTP 201.
