The issue is:
1. `request.json()` throws on malformed JSON without error handling
2. Missing validation for `body.name`

I need to add try/catch and validate both fields:







All tests pass. **Fix summary:**

| File | Change |
|------|--------|
| `bench-targets/next-api/app/api/users/route.mjs` | Added try/catch around `request.json()` to handle malformed JSON (line 6-9); Added validation for `body.name` field (line 10) |

**Commands run:**
```bash
node --test bench-targets/next-api/route.test.mjs
```

**Verification status:** `passed` (2/2 tests)
