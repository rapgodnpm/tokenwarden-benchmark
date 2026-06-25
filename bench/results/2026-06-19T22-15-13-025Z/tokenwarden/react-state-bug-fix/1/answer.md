The bug is in `useCartState.mjs` line 7: `next.items.push(item)` mutates the original state's items array instead of creating a new array. This causes the test to fail because it asserts that the previous state should remain unmodified.







The issue is that `{ ...state }` creates a shallow copy, so `next.items === state.items`. The test fails because `state.items` gets mutated. I need to fully clone the state.







Fixed. The bug was shallow cloning (`{ ...state }`) which kept `next.items` as the same array reference as `state.items`, causing unintended mutation. The fix creates a new array and state object:

- File: `bench-targets/react-state/src/useCartState.mjs:5`
- Changed: `const next = { ...state }` → `const nextItems = [...state.items, item]`
- Changed: `next = { items: next, total: next.items.length }` → `return { items: nextItems, total: nextItems.length }`
- Removed: `next.items.push(item)` and `nextItems.push(item)` (no mutation)

**Verification:** `node --test bench-targets/react-state/useCartState.test.mjs` — **Passed**
