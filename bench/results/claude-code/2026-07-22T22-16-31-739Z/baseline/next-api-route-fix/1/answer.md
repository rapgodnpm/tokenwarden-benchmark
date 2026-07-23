

## Summary

**Fixed file:** `/work/baseline-next-api-route-fix-1/repo/bench-targets/next-api/app/api/users/route.mjs`

**Changes made:**
1. Added `let body` initialization before the try block to handle scope in the catch block
2. Wrapped `request.json()` in a try-catch to return HTTP 400 for malformed JSON
3. Added `!body.name` check to require the `name` field (now returns 400 if missing)

**Command run:** `node --test bench-targets/next-api/route.test.mjs`

**Verification status:** All 2 tests pass
- `POST rejects malformed JSON and missing fields` ✓
- `POST accepts valid user payload` ✓
