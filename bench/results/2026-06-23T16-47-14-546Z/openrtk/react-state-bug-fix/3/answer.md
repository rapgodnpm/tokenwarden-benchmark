The bug is in `addItem` - it creates a direct reference to `state` instead of a copy. This mutates the original state. The fix is to spread the items array and create a new object.







Fixed the immutability bug in [`bench-targets/react-state/src/useCartState.mjs`](bench-targets/react-state/src/useCartState.mjs).

**Change:** Replaced direct state mutation with immutable updates using spread operator:
```javascript
// Before: mutated original `state`
const next = state
next.items.push(item)

// After: creates new objects
const next = { items: [...state.items, item], total: state.items.length + 1 }
```

Test verification: `node --test bench-targets/react-state/useCartState.test.mjs` → **1 pass, 0 fail**
