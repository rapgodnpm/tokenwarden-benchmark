Fixed `/private/tmp/tokenwarden-bench/2026-06-22T14-18-01-250Z/openrtk-next-api-route-fix-2/repo/bench-targets/next-api/app/api/users/route.mjs`:

1. Added try-catch around `request.json()` to handle malformed JSON (returns 400)
2. Added validation for required `name` field (returns 400 if missing)
3. Kept email validation and existing API route shape

```bash
node --test bench-targets/next-api/route.test.mjs
```

**Verification status**: Both tests pass (2/2)
