**Added title-case support** to `bench-targets/feature/src/formatTitle.mjs` by implementing a `'title'` mode that capitalizes the first letter and lowercases the rest of each word.

**File modified:**
- `bench-targets/feature/src/formatTitle.mjs:2` - Added title case logic using `split(/\s+/)` to tokenize words, then capitalize first letter and lowercase the rest.

**Verification:**
```
node --test bench-targets/feature/formatTitle.test.mjs
```
- **Status:** ✅ PASS
- **Test:** 'formatTitle supports title case mode' passed (1 pass, 0 fail)
