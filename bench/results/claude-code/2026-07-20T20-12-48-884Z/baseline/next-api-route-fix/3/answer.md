

## Summary

Fixed validation and error handling in `bench-targets/next-api/app/api/users/route.mjs`:

**Changes made:**
1. **Added try-catch for malformed JSON** - `request.json()` throws when JSON is malformed. Added try-catch to return HTTP 400 with error message.
2. **Moved `body` declaration outside try-catch** - Changed `const body` inside the try block to `let body` at function scope so it remains accessible after the try-catch.
3. **Added missing `name` field validation** - The route requires both `email` and `name`, added check for required `name` field.

**Commands run:**
```bash
node --test bench-targets/next-api/route.test.mjs
```

**Verification status:**
- ✅ Test 1: POST rejects malformed JSON and missing fields - **PASSED**
- ✅ Test 2: POST accepts valid user payload - **PASSED**
- **All tests passed (2/2)**
