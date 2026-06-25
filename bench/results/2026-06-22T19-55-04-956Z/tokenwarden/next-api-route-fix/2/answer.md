Fixed validation and error handling in `bench-targets/next-api/app/api/users/route.mjs`:

1. Added try-catch to handle malformed JSON → HTTP 400
2. Added validation for required `name` field → HTTP 400
3. Kept existing email validation intact

```
bench-targets/next-api/route.test.mjs: pass 2/2
```
