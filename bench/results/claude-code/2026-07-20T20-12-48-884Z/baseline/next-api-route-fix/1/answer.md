

All tests pass.

## Summary

**File edited:** `bench-targets/next-api/app/api/users/route.mjs`

**Changes made:**
1. Added try-catch around `request.json()` to catch malformed JSON and return HTTP 400
2. Added validation for the required `name` field to return HTTP 400 if missing

**Verification:**
```
node --test bench-targets/next-api/route.test.mjs
# tests 2
# pass 2
# fail 0
```
