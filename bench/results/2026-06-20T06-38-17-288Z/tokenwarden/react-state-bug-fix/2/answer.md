Found the bug. In `useCartState.mjs`, `addItem` mutates the original `state.items` array by pushing directly to it, which violates the immutability requirement tested by `assert.notEqual(next, state)`.







The test passes one assertion but now fails on `next.total`. The test expects total to be 1 (items.length after adding), but my implementation defaults price to 0. I need to recalculate total based on items:







The test still fails. Let me examine the test file more carefully - the test creates an item with `{ id: 'a', label: 'Alpha' }` without a `price` property, and expects `total` to be 1, not 0.




The test expects `next.total` to equal 1 (the count of items), not a price sum. The total should be calculated as items.length:







Test passes. Fixed by updating `addItem` to properly create a new state object with a copy of items and recalculating total as items.length:

**File modified**: bench-targets/react-state/src/useCartState.mjs

```javascript
// Before
export function addItem(state, item) {
  const next = state  // BUG: reuses state object
  next.items.push(item)  // MUTATES original state
  next.total = state.items.length
  return next
}

// After
export function addItem(state, item) {
  const next = { items: [...state.items, item], total: [...state.items, item].length }
  return next  // NEW state object with fresh copy of items
}
```

Fixes immutability bug causing test failure.
