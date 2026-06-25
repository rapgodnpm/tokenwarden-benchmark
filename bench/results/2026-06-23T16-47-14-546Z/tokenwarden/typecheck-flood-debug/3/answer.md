The root cause is clear: `schema.mjs` defines `userFields = ['id', 'name']` but the validator expects `['id', 'name', 'email']`. The fix is to add `'email'` to the schema.







Fixed in `bench-targets/typecheck-flood/src/schema.mjs`.

**Summary:**
- **Root cause:** `userFields` array missing `'email'` field
- **Fix:** Added `'email'` to `userFields` array (1-line change)
- **Verification:** `node typecheck.mjs` now exits cleanly with no output

**Changed:**
- `bench-targets/typecheck-flood/src/schema.mjs`: `'id', 'name'` → `'id', 'name', 'email'`
