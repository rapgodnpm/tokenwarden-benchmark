The route has two issues:
1. No try-catch around `request.json()` - malformed JSON will crash instead of returning 400
2. Missing validation for the `name` field - test expects 400 when `name` is missing







Fix applied successfully.

**File edited**: `bench-targets/next-api/app/api/users/route.mjs`

**Changes**:
1. Added try-catch around `request.json()` to return 400 for malformed JSON
2. Added validation for required `name` field returning 400 if missing

**Command run**: `node --test bench-targets/next-api/route.test.mjs`

**Verification status**: ✅ All 2 tests pass
- POST rejects malformed JSON and missing fields
- POST accepts valid user payload
