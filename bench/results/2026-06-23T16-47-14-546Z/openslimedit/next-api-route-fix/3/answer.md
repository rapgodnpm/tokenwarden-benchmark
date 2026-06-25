The route has two issues:
1. No try-catch around `request.json()` - malformed JSON will crash instead of returning 400
2. Missing `name` field validation







The `body` variable is not defined in the catch block. I need to restructure:







**Fix summary**

**File:** `bench-targets/next-api/app/api/users/route.mjs`

**Changes:**
- Added `try-catch` around `request.json()` to handle malformed JSON → HTTP 400
- Added `let body` declaration so variable exists even in catch block
- Added `!body.name` check → HTTP 400 for missing name field

**Test result:**
```
tests 2, pass 2, fail 0
```
