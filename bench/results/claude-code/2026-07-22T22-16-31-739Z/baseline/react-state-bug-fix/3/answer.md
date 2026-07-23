

## Summary

**Fixed file:** `bench-targets/react-state/src/useCartState.mjs`

**Before:**
```javascript
export function addItem(state, item) {
  const next = state
  next.items.push(item)
  next.total = state.items.length
  return next
}
```

**After:**
```javascript
export function addItem(state, item) {
  return {
    items: [...state.items, item],
    total: state.items.length + 1
  }
}
```

**Verification:** `node --test bench-targets/react-state/useCartState.test.mjs` — **PASSED** (1 test passed)
