

## Summary

**File modified:** `bench-targets/feature/src/formatTitle.mjs`

**Changes:**
- Added `mode === 'title'` case that converts text to title case (first letter of each word capitalized)
- Uses `split(/\s+/)` to handle multiple spaces while preserving word boundaries
- Lowercases remaining characters after capitalizing first letter

**Verification:**
```
node --test bench-targets/feature/formatTitle.test.mjs
```
Status: **PASS** - Test passes with `ok 1 - formatTitle supports title case mode`
