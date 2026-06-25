Added title case support to formatTitle.mjs:
- Added `toTitleCase()` helper function that converts text to title case
- Added `mode === 'title'` branch to use the helper

```
node --test bench-targets/feature/formatTitle.test.mjs
```

**Result:** PASS (1 test, 0 failures)
