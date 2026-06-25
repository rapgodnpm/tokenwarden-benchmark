I see the issues. The current code doesn't handle malformed JSON (line 6 will throw instead of returning 400) and doesn't validate the `name` field. Let me fix the route:







Fixed `route.mjs`:

1. Added try-catch around `request.json()` to return 400 for malformed JSON
2. Added validation for required `name` field missing
3. Kept existing email validation intact

All tests pass.
