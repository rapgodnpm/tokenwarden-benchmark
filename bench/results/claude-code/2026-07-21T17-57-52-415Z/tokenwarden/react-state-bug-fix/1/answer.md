

## Summary

**Bug:** In `bench-targets/react-state/src/useCartState.mjs`, the `addItem` function reused the `state` reference (`const next = state`) instead of creating a new object, causing the original state to be mutated.

**Fix:** Create a new state object with shallow copies of the `items` array and update `total`.

### Change made:
- **File:** `bench-targets/react-state/src/useCartState.mjs`
- **Line:** 5-9

**Before:**
```js
export function addItem(state, item) {
  const next = state
  next.items.push(item)
  next.total = state.items.length
  return next
}
```

**After:**
```js
export function addItem(state, item) {
  const next = { items: [...state.items], total: state.items.length }
  next.items.push(item)
  next.total = state.items.length + 1
  return next
}
```

### Verification:
```
Command: node --test bench-targets/react-state/useCartState.test.mjs
Status: PASS (1 test passed)
```
