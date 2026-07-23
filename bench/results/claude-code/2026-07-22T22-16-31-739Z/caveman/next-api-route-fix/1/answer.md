

Fixed both issues. Summary:

- **Malformed JSON** — wrapped `request.json()` in `try/catch` returning 400.
- **Missing `name` field** — added validation checking `body.name` exists, returning 400 if absent.

Test run: 2 tests, 2 passed, 0 failed.
