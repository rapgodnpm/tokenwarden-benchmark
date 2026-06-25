The bug is in `addItem` at line 6-7: `const next = state` creates a reference to the original state, so `next.items.push(item)` mutates the original state array. The fix is to create a new items array and correctly calculate the total.







Test passes. Summary:

**Bug**: `addItem` reused the same `state` object reference (`const next = state`), causing `push()` to mutate the original array.

**Fix**: `bench-targets/react-state/src/useCartState.mjs:5` - Created new items array via spread (`[...state.items]`) and corrected `total` calculation to `state.items.length + 1`.
