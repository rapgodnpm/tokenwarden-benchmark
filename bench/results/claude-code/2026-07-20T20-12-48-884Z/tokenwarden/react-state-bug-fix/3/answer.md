

## Summary

**File edited:** `bench-targets/react-state/src/useCartState.mjs`

**Bug:** The `addItem` function was mutating the original state object by directly pushing to `state.items`, violating React's immutability requirements.

**Fix:** Changed `addItem` to return a new object with spread syntax, creating a new items array instead of mutating:
```javascript
// Before (mutates state)
export function addItem(state, item) {
  const next = state
  next.items.push(item)
  next.total = state.items.length
  return next
}

// After (creates new immutable state)
export function addItem(state, item) {
  return {
    ...state,
    items: [...state.items, item],
    total: state.items.length + 1
  }
}
```

**Verification status:** ✅ Test passes
