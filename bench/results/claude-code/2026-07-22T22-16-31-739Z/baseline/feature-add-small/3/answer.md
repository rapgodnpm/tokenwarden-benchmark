

## Summary

**File updated:** `/work/baseline-feature-add-small-3/repo/bench-targets/feature/src/formatTitle.mjs`

**Change added:** Title-case mode support using the existing mode-based pattern:

```javascript
if (mode === 'title') {
  return value.split(' ').map(word => word[0].toUpperCase() + word.slice(1).toLowerCase()).join(' ')
}
```

**Verification:** `node --test bench-targets/feature/formatTitle.test.mjs` passed (1 test, 1 pass).
