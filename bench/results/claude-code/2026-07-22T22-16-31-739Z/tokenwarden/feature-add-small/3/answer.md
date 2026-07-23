

All tests pass. Here's the summary:

**Changes made:**
- **File:** `bench-targets/feature/src/formatTitle.mjs`
- **Change:** Added title-case mode support by splitting on spaces, capitalizing the first letter of each word, and joining back together

**Final implementation:**
```javascript
export function formatTitle(value, mode = 'plain') {
  if (mode === 'upper') return value.toUpperCase()
  if (mode === 'lower') return value.toLowerCase()
  if (mode === 'title') return value.split(' ').map(word => word[0].toUpperCase() + word.slice(1)).join(' ')
  return value
}
```

**Verification status:**
- Command: `node --test bench-targets/feature/formatTitle.test.mjs`
- Result: **PASSED** (1 test, 0 failures)
