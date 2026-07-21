

All tests pass. Here's the summary:

## Verification Status
- ✅ **Command**: `node --test bench-targets/next-api/route.test.mjs`
- ✅ **Result**: 2 tests passed, 0 failed

## Changes Made
**File**: `bench-targets/next-api/app/api/users/route.mjs`

**Fixes applied**:
1. **Malformed JSON handling**: Added try-catch around `request.json()` to return HTTP 400 when JSON parsing fails
2. **Missing required fields validation**: Added check for `body.name` in addition to existing email validation, returning HTTP 400 when either is missing or invalid

The API route shape remains intact - it still:
- Returns HTTP 400 for malformed JSON, missing email, invalid email (no @), or missing name
- Returns HTTP 201 for valid payloads with the same response format
