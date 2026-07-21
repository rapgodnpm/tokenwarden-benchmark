

**Refactor complete.**

**Changes made:**
- **File:** `bench-targets/refactor/src/name-formatters.mjs`
- Introduced shared helper `normalizeName(value)` that handles `value.trim().replace(/\s+/g, ' ')`
- Refactored `formatFirstName` and `formatLastName` to use the shared helper
- Both public exports preserved

**Verification:**
```
node --test bench-targets/refactor/name-formatters.test.mjs
```
Result: `1 pass, 0 fail` ✅
