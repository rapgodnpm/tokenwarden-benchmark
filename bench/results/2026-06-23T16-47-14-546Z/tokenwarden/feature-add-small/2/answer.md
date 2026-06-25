I need to add 'title' mode support. The test expects `title-case` (cap first letter of each word).







Test passes.

**Changes made:**
- File: `bench-targets/feature/src/formatTitle.mjs`
- Added `title` mode that converts first letter of each word to uppercase

**Verification:**
- Command: `node --test bench-targets/feature/formatTitle.test.mjs`
- Status: ✅ Pass (1/1 tests passed)
