

## Summary

**Changes Made:**
- **File**: `bench-targets/feature/src/formatTitle.mjs`
- Added `title` mode support that converts text to title case (first letter of each word uppercase, remaining letters lowercase)

**Code Change:**
```javascript
if (mode === 'title') {
  return value.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ')
}
```

**Verification Status:**
- Command: `node --test bench-targets/feature/formatTitle.test.mjs`
- Result: **1 test passed** (0 failed)
- Test: `formatTitle('hello benchmark world', 'title')` correctly returns `'Hello Benchmark World'`
