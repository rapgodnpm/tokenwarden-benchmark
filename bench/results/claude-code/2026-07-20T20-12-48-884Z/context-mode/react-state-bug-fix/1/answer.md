

## Summary

**Bug Found:** In `bench-targets/react-state/src/useCartState.mjs`, the `addItem()` function mutated the original state object directly by assigning `const next = state`. This violated immutability and caused `state.items` to be modified.

**Fix Applied:** Created a shallow copy of the state with a new items array, then modified the copy:

| Line | Before | After |
|------|--------|-------|
| 6 | `const next = state` | `const next = { items: [...state.items], total: state.items.length }` |
| 7 | `next.items.push(item)` | `next.items.push(item)` (same - now safe on copy) |
| 8 | `next.total = state.items.length` | `next.total = next.items.length` (after push) |

**Verification:** Ran `node --test bench-targets/react-state/useCartState.test.mjs` — test passes.
