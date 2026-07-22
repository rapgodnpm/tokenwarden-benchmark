

## Summary

**File Modified:** `bench-targets/feature/src/formatTitle.mjs`

**Change:** Added `title` mode support that capitalizes the first letter of each word and lowercases the rest, following the existing mode-based pattern with `upper` and `lower`.

**Verification:** ✅ Passed with `node --test bench-targets/feature/formatTitle.test.mjs`
- 1 test, 1 pass, 0 fail

The test verifies:
- Title case: `'hello benchmark world'` → `'Hello Benchmark World'`
- Lower case: `'LOUD'` → `'loud'`
