

## Summary

**Changes Made:**

- **File**: `bench-targets/feature/src/formatTitle.mjs`
- **Change**: Added `'title'` mode support using the existing mode-based pattern

**Implementation:**
```javascript
if (mode === 'title') {
  return value
    .toLowerCase()
    .split(' ')
    .map((word) => word[0]?.toUpperCase() + word.slice(1))
    .join(' ')
}
```

**Verification Status:**
- **Command**: `node --test bench-targets/feature/formatTitle.test.mjs`
- **Result**: ✅ Pass (1 test, 0 failures)
