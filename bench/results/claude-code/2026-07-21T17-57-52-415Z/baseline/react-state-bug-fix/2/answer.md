

**Verification Status:** PASS

**Change Summary:**
- **File:** `bench-targets/react-state/src/useCartState.mjs`
- **Fix:** Replaced the mutating implementation with an immutable one that creates a new `items` array (via spread) and computes `total` without relying on the old `state.items.length`.

Before:
```js
export function addItem(state, item) {
  const next = state
  next.items.push(item)
  next.total = state.items.length
  return next
}
```

After:
```js
export function addItem(state, item) {
  return {
    items: [...state.items, item],
    total: state.items.length + 1
  }
}
```
