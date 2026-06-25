Fixed validation in `bench-targets/next-api/app/api/users/route.mjs`:
1. Added try-catch around `request.json()` to handle malformed JSON → 400
2. Added check for `body.name` field → 400 if missing

Verification: `node --test bench-targets/next-api/route.test.mjs` ran with **2 passed, 0 failed**.
