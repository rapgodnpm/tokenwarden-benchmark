

The title-case support has been successfully added.

## Summary

**File modified:** `bench-targets/feature/src/formatTitle.mjs`

**Change:** Added a `'title'` mode that:
1. Converts the input to lowercase
2. Splits by spaces into words
3. Capitalizes the first letter of each word and lowercases the rest
4. Joins back into a single string

**Verification:** All tests pass ✅
```
node --test bench-targets/feature/formatTitle.test.mjs
```
- 1 test, 1 pass, 0 fail
