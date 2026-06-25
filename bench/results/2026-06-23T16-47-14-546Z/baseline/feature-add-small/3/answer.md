Added 'title' mode support to `formatTitle.mjs:2-2`.

**Changes:**
- File: `bench-targets/feature/src/formatTitle.mjs`
- Added title case logic: splits by space, capitalizes first letter of each word, joins back

**Verification:**
```bash
node --test bench-targets/feature/formatTitle.test.mjs
```
✅ **PASS** (1 test passed)
