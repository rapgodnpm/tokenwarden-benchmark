

**Fix complete.**

**Changes made to `/private/tmp/tokenwarden-bench/claude-code/2026-07-21T17-57-52-415Z/context-mode-next-api-route-fix-3/repo/bench-targets/next-api/app/api/users/route.mjs`:**

1. Added try/catch around `request.json()` to return HTTP 400 for malformed JSON
2. Added validation for the `name` field to require it (returns HTTP 400 if missing)

**Verification:**
```
node --test bench-targets/next-api/route.test.mjs
# tests 2
# pass 2
# fail 0
```

Both test cases pass: malformed JSON returns 400, missing `name` returns 400, and valid payloads return 201.
