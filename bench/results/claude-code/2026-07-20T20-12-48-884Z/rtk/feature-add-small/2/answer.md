

All tests pass.

## Summary

**File modified:** `bench-targets/feature/src/formatTitle.mjs`

**Change:** Added title case mode support to the `formatTitle` function using the existing mode-based pattern:

```javascript
if (mode === 'title') {
  return value.toLowerCase().replace(/\b\w/g, char => char.toUpperCase())
}
```

**Commands run:**
- `node --test bench-targets/feature/formatTitle.test.mjs`

**Verification status:** ✅ PASS (1 test passed)
