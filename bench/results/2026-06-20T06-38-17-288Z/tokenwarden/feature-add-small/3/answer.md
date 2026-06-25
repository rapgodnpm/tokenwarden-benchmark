The Hono repo doesn't have a titleCase implementation, so I'll implement title-case using standard JavaScript. Let me add the title mode to formatTitle:




That implementation uses an internal `LocaleTitle` API which might not exist. Let me fix it to use standard methods:




Still not quite right for the test. Let me implement title case properly:













**Summary: feature-add-small complete**

**Changes:**
- Added title-case support to `/bench-targets/feature/src/formatTitle.mjs:2-4`
- New mode logic: `title` mode now capitalizes first letter and lowercases rest of each word
- Uses standard JavaScript `split`, `map`, `join` without external dependencies

**Verification:**
```
node --test bench-targets/feature/formatTitle.test.mjs
# Result: 1 test passed (duration 36ms)
```

**Test:** `assert.equal(formatTitle('hello benchmark world', 'title'), 'Hello Benchmark World')` - ✓ PASS
