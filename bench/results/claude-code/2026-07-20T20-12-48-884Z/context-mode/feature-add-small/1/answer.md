

## Summary

**File modified:** `bench-targets/feature/src/formatTitle.mjs`

**Change added:** Title-case mode support following the existing mode-based pattern:
```javascript
if (mode === 'title') return value.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')
```

**Verification status:** `PASS` - All 1 test passed with `node --test bench-targets/feature/formatTitle.test.mjs`
