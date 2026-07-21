

Verification successful. Here's the summary:

**Changes made:**
- File: `bench-targets/feature/src/formatTitle.mjs`
- Added `mode === 'title'` support that:
  1. Converts the input to lowercase
  2. Splits by spaces
  3. Capitalizes the first letter of each word and lowercases the rest
  4. Joins back with spaces

**Commands run:**
- `node --test bench-targets/feature/formatTitle.test.mjs`

**Verification status:**
- ✅ Test passed (1 pass, 0 fail)
- The title-case functionality works correctly: `'hello benchmark world'` → `'Hello Benchmark World'`
