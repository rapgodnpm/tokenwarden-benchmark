

## Summary

**File edited:** `bench-targets/react-state/src/useCartState.mjs`

**Bug:** `addItem` was mutating the original `state` object and returning it, violating immutability. The function assigned `state` directly to `next`, then mutated it.

**Fix:** Create a shallow copy of state with a deep copy of the `items` array:
```javascript
export function addItem(state, item) {
  const next = {
    ...state,
    items: [...state.items]
  }
  next.items.push(item)
  next.total = next.items.length
  return next
}
```

**Verification status:** ✅ **PASS** - `node --test bench-targets/react-state/useCartState.test.mjs` completed successfully (1 test passed).
