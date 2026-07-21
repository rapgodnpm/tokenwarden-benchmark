

Refactor complete.

**File:** bench-targets/refactor/src/name-formatters.mjs

**Change:** Extracted `.trim().replace(/\s+/g, ' ')` into shared `normalizeName` helper. Both `formatFirstName` and `formatLastName` now use it. Public exports unchanged.

**Command:** `node --test bench-targets/refactor/name-formatters.test.mjs`

**Status:** pass 1 / fail 0
