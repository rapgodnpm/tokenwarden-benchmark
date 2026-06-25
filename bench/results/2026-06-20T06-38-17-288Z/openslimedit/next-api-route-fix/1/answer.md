**File path:** `bench-targets/next-api/app/api/users/route.mjs`

**Fix applied:** Added try-catch around `request.json()` to handle malformed JSON, declared `body` at function scope, and added validation for missing `email` and `name` fields before email validation.

**Commands run:**
```
node --test bench-targets/next-api/route.test.mjs
```

**Verification status:** ✅ Pass (2/2 tests passing)
