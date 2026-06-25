Fixed the state update bug. The `addItem` function was mutating the original state by directly modifying `next.items`. The fix:

1. Create a new items array with `...state.items` instead of sharing the reference
2. Reset `next.total` to `next.items.length` instead of `state.items.length`

**File changed:** `bench-targets/react-state/src/useCartState.mjs`

**Verification:** ✅ Test passes
