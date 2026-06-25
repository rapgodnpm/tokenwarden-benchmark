Now I understand the issues:
1. **Malformed JSON**: The code doesn't handle `TypeError` when `request.json()` parses invalid JSON
2. **Missing fields**: Only validates `email`, but `name` is also required per the test

The test expects:
- `POST` with malformed JSON `{` → HTTP 400
- `POST` with `{ email: 'a@example.com' }` (missing `name`) → HTTP 400  
- `POST` with valid `email` and `name` → HTTP 201







All tests pass. Here's a summary of the fix:

**Problem:**
1. Malformed JSON `{` threw unhandled error
2. Missing `name` field wasn't validated

**Fix:**
- Wrapped `request.json()` in `try-catch` to handle malformed JSON (returns 400)
- Added `if (!body.name) return json({ error: 'missing field' }, 400)` to validate required fields

**Verification:**
```
1..2
# tests 2
# pass 2
# fail 0
```
