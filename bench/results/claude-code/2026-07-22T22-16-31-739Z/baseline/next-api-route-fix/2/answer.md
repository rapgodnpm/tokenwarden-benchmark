

All tests pass. Here's the summary:

## Summary

**File modified:**
- `/work/baseline-next-api-route-fix-2/repo/bench-targets/next-api/app/api/users/route.mjs`

**Changes made:**
1. Added try-catch around `request.json()` to handle malformed JSON and return HTTP 400
2. Added validation for the required `name` field alongside the email validation
3. Combined all validation errors into a single error response

**Commands run:**
```bash
node --test bench-targets/next-api/route.test.mjs
```

**Verification status:**
- ✅ POST rejects malformed JSON (status 400)
- ✅ POST rejects missing required fields like `name` (status 400)  
- ✅ POST accepts valid user payloads with email and name (status 201)
- ✅ Total: 2/2 tests passed
