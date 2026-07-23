

## Summary

**File refactored:** `/work/tokenwarden-refactor-no-behavior-change-3/repo/bench-targets/refactor/src/name-formatters.mjs`

**Changes:**
- Created a shared `normalizeName` helper function containing `value.trim().replace(/\s+/g, ' ')`
- `formatFirstName` and `formatLastName` now delegate to `normalizeName`
- Public exports remain unchanged (`formatFirstName` and `formatLastName`)

**Verification status:** ✅ **PASS**

```
TAP version 13
# Subtest: name formatters preserve behavior
ok 1 - name formatters preserve behavior
# tests 1
# pass 1
# fail 0
```
