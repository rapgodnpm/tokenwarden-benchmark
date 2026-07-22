

All tests pass. Here's the summary:

## Changes Made

**File:** `bench-targets/next-api/app/api/users/route.mjs`

**Fixes:**
1. **Malformed JSON handling** - Added `try...catch` around `request.json()` to catch parsing errors and return HTTP 400
2. **Missing `name` field validation** - Added check for `body.name` to return HTTP 400 if absent

## Verification Status

```
✅ POST rejects malformed JSON and missing fields
✅ POST accepts valid user payload
Tests: 2 passed, 0 failed
```

The API route shape remains intact, with validation now correctly returning:
- HTTP 400 for malformed JSON
- HTTP 400 for missing `name` field  
- HTTP 400 for missing/invalid `email`
- HTTP 201 for valid payloads
