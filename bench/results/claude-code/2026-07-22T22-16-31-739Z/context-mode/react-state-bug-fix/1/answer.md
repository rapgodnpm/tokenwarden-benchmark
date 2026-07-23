

**Fix Summary:**

| File | Change |
|------|--------|
| `bench-targets/react-state/src/useCartState.mjs` | Replaced mutating pattern with immutable state update using spread operators |

**Before (buggy):**
```javascript
export function addItem(state, item) {
  const next = state              // Same reference!
  next.items.push(item)           // Mutates state
  next.total = state.items.length
  return next
}
```

**After (fixed):**
```javascript
export function addItem(state, item) {
  return { ...state, items: [...state.items, item], total: state.items.length + 1 }
}
```

The fix creates a new state object with a new `items` array, preserving immutability and allowing React to detect state changes correctly.

**Verification:**
```
$ node --test bench-targets/react-state/useCartState.test.mjs
✓ addItem returns a new state object without mutating previous state (pass)
```
