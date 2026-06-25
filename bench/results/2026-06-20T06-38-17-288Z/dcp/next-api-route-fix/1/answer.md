Fix applied to handle malformed JSON with HTTP 400 and missing required `name` field. Test verification:

- `POST rejects malformed JSON and missing fields`: **passed** (both the malformed JSON `'{'` test and the missing `name` field with only `email` test return HTTP 400)
- `POST accepts valid user payload`: **passed** (valid payload with `email` and `name` returns HTTP 201 with the expected response body)

**Edits made:**
- Added `try-catch` around `request.json()` to catch `SyntaxError` for malformed JSON, returning HTTP 400
- Changed `body` variable declaration to `let body` to maintain scope after the try-catch
- Added validation for missing `body.name` field to return HTTP 400
