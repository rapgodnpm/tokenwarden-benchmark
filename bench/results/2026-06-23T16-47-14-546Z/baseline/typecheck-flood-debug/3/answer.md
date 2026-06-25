**Fix applied:**
- **File:** `bench-targets/typecheck-flood/src/schema.mjs`
- **Change:** Added `'email'` to `userFields` array (`['id', 'name', 'email']`)

**Verification:** `node typecheck.mjs` exits with code 0 (success)

The root cause was the schema missing the required `email` field, triggering repeated type error messages.
