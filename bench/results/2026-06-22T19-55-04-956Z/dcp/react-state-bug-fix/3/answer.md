The bug is clear: `addItem` mutates the same object reference (`next` points to `state`) instead of creating a proper copy. On line 6-8, `next.items.push(item)` mutates `state.items` directly since both reference the same object.

Fix: Clone the items array in `addItem` to prevent mutation.







Test fails on `state.total`. Now `total` isn't updating correctly because I copied `state.items` without including the mutation. Update total correctly by referencing the new items array:







Fixed by cloning the items array and computing total from the new items array instead of mutating state.

**Bug**: `addItem` returned the same object reference as `state`, mutating `state.items` via `push`, failing the test's assertion that `state` is unchanged.

**Fix** (`bench-targets/react-state/src/useCartState.mjs:5-7`):
- Changed from `const next = state; next.items.push(item)` (mutates)
- To `const next = { items: [...state.items, item], total: state.items.length + 1 }` (creates new object with cloned items)

**Verification**: `node --test bench-targets/react-state/useCartState.test.mjs` — **1 test passed**.
