

Done. Added title-case support to `bench-targets/feature/src/formatTitle.mjs`.

- **File modified:** `bench-targets/feature/src/formatTitle.mjs`
  - Added `if (mode === 'title')` branch that splits on spaces, capitalizes first letter of each word, lowercases the rest, and rejoins.
- **Verification:** `node --test bench-targets/feature/formatTitle.test.mjs` — passed (1 test, 0 failures).
