Refactored `bench-targets/refactor/src/name-formatters.mjs`:
- Created shared `normalizeName` helper that removes duplicated whitespace normalization logic
- Kept existing public exports `formatFirstName` and `formatLastName` (now delegate to `normalizeName`)
- Behavior unchanged

```bash
node --test bench-targets/refactor/name-formatters.test.mjs
```

**Verification status:** ✅ Pass (1 test passed, 0 failed)
