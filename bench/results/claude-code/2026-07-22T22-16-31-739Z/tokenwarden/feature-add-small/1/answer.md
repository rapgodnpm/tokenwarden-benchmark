

## Summary

**Files modified:**
- `/work/tokenwarden-feature-add-small-1/repo/bench-targets/feature/src/formatTitle.mjs`

**Change made:**
Added title-case mode support using the existing mode-based pattern. The implementation:
1. Splits the value by spaces
2. Maps each word to capitalize the first letter and lowercase the rest
3. Joins back with spaces

**Verification:**
```
$ node --test bench-targets/feature/formatTitle.test.mjs
# Subtest: formatTitle supports title case mode
ok 1 - formatTitle supports title case mode
1..1
# tests 1
# pass 1
# fail 0
```

The test passes successfully.
