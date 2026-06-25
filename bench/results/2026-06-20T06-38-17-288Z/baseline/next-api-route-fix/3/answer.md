**Summary**

| Item | Status |
|------|--------|
| File modified | `bench-targets/next-api/app/api/users/route.mjs` |
| Tests run | `node --test bench-targets/next-api/route.test.mjs` |
| Verification status | **All 2 tests passed** |

**Fix applied:**
1. Added `try/catch` around `request.json()` to handle malformed JSON (returns 400)
2. Added validation for required `name` field (returns 400 if missing)
3. API route shape preserved (still returns 201 for valid payloads, same response structure)
