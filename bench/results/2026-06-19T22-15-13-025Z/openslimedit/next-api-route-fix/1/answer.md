Fixed two issues in `bench-targets/next-api/app/api/users/route.mjs`:

1. **Malformed JSON handling** - Added try/catch around `request.json()` to return HTTP 400 when JSON is invalid
2. **Missing required field handling** - Added validation for `name` field requiring it to return HTTP 400

Tests: ⏳ **pass 2 / fail 0**
