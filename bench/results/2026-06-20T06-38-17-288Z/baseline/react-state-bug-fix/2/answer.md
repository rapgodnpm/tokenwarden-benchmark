Fixed by changing `const next = state` to `const next = { ...state }` (line 6) and `next.total = state.items.length` to `next.total = next.items.length` (line 9) to prevent state mutation and correctly calculate the total.

Commands run:
1. Read three files: `bench-targets/react-state/src/useCartState.mjs`, `bench-targets/react-state/src/CartPanel.jsx`, `bench-targets/react-state/useCartState.test.mjs`
2. Edited `useCartState.mjs` - two line changes to prevent mutations and recalculate total
3. Ran `node --test bench-targets/react-state/useCartState.test.mjs` - passed with 1 test passing
