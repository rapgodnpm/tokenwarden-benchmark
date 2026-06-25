**Summary:**

**File edited:** `bench-targets/next-api/app/api/users/route.mjs`

**Changes made:**
1. Wrapped `await request.json()` in try-catch to return HTTP 400 on malformed JSON
2. Added validation for required `name` field alongside existing email validation

**Commands run:**
```bash
node --test bench-targets/next-api/route.test.mjs
```

**Verification status:**
- ✅ Test 1 (POST rejects malformed JSON and missing fields): PASS
- ✅ Test 2 (POST accepts valid user payload): PASS
- ✅ All 2 tests passed
