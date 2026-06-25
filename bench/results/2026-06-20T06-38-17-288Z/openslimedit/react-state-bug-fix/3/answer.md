The test fails because `addItem` is mutating the original state object (line 7: `next.items.push(item)`) and returning the same object reference. The test expects immutability - `next` should not be reference-equal to `state`.

Fix by creating new objects instead of mutating:







Now `state.total` is correctly 0, but `next.total` is 0 instead of 1. Need to calculate total from the new items array:







**Verification status:** Pass ✓

**Fix applied to `/private/tmp/tokenwarden-bench/2026-06-20T06-38-17-288Z/openslimedit-react-state-bug-fix-3/repo/bench-targets/react-state/src/useCartState.mjs`:**

Changed `addItem` to create new objects instead of mutating:
```javascript
// Before (buggy):
export function addItem(state, item) {
  const next = state
  next.items.push(item)
  next.total = state.items.length  // BUG: total from old state
  return next
}

// After (fixed):
export function addItem(state, item) {
  return {
    items: [...state.items, item],
    total: [...state.items, item].length
  }
}
```

Test passes: `addItem` now returns a new object without mutating the previous state.
