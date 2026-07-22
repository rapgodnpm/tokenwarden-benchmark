

**Verification Status:** ✅ All tests pass

**Changes Made:**
- **File:** `bench-targets/feature/src/formatTitle.mjs`

**Code Added:**
Added a `'title'` mode that converts text to title case by:
1. Converting the value to lowercase
2. Splitting by spaces
3. Capitalizing the first letter of each word
4. Joining back with spaces

**Command Run:**
```bash
node --test bench-targets/feature/formatTitle.test.mjs
```

**Result:** 1 test passed, 0 failed.
