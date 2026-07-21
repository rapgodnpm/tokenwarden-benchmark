

All tests pass.

## Summary

**File edited:** `bench-targets/next-api/app/api/users/route.mjs`

**Changes made:**
1. Added `try/catch` block around `request.json()` to handle malformed JSON and return HTTP 400
2. Added validation for required `body.name` field, returning HTTP 400 if missing
3. Moved `body` declaration outside the try block to avoid block scope issues

**Test verification status:**
- `POST rejects malformed JSON and missing fields` - **PASS**
- `POST accepts valid user payload` - **PASS**

```
tests 2
pass 2
fail 0
```
