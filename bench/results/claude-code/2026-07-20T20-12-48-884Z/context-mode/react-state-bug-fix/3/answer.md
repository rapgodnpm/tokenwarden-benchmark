

**Summary:**

| Item | Value |
|------|-------|
| **File changed** | `bench-targets/react-state/src/useCartState.mjs` |
| **Bug** | `addItem` mutated `state.items` directly via `push()`, violating immutability |
| **Fix** | Create immutable state with spread operator: `{ items: [...state.items, item], total: state.items.length + 1 }` |
| **Verification** | `node --test bench-targets/react-state/useCartState.test.mjs` → **PASS** (1 passed, 0 failed) |
