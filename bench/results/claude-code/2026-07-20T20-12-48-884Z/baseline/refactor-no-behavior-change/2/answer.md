

## Summary

**Refactoring completed successfully.**

| File | Change |
|------|--------|
| `bench-targets/refactor/src/name-formatters.mjs` | Extracted duplicated `trim()` + `replace(/\s+/g, ' ')` into shared `normalizeName` helper |

**Before:**
```mjs
export function formatFirstName(value) {
  return value.trim().replace(/\s+/g, ' ')
}

export function formatLastName(value) {
  return value.trim().replace(/\s+/g, ' ')
}
```

**After:**
```mjs
export function normalizeName(value) {
  return value.trim().replace(/\s+/g, ' ')
}

export function formatFirstName(value) {
  return normalizeName(value)
}

export function formatLastName(value) {
  return normalizeName(value)
}
```

**Verification status:**
```bash
$ node --test bench-targets/refactor/name-formatters.test.mjs
ok 1 - name formatters preserve behavior
tests 1, pass 1, fail 0
```
