

All tests pass. Here's the summary:

## Summary

### Changes Made
**File:** `bench-targets/next-api/app/api/users/route.mjs`

### Issues Fixed
1. **Malformed JSON handling**: Added a `try-catch` block around `request.json()` to catch parsing errors and return HTTP 400
2. **Missing required field validation**: Added check for `body.name` to ensure the required `name` field is present, returning HTTP 400 if missing

### Test Results
```
✓ POST rejects malformed JSON and missing fields
✓ POST accepts valid user payload
2 tests passed
```

### Verification Command
```bash
node --test bench-targets/next-api/route.test.mjs
```
