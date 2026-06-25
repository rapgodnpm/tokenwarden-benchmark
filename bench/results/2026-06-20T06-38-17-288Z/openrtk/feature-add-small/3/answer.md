Added title-case support to formatTitle.mjs using the existing mode-based pattern. The implementation capitalizes the first letter of each word.

**Verification:**
- Command: `node --test bench-targets/feature/formatTitle.test.mjs`
- Status: ✅ 1 test passed, 0 failed

**Changes made:**
- Added `title` mode to formatTitle function that performs word-by-word capitalization by splitting on spaces and uppercasing the first character of each word.
