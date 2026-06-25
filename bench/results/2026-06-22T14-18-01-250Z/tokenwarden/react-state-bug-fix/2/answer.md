Fixed the state mutation bug in `useCartState.mjs`. The issue was that `const next = state` created a reference to the same object, causing the original state to be mutated. Fixed by properly cloning the state object on line 6.

Changed:
- `const next = state` → `const next = { ...state, items: [...state.items], total: 0 }`

Run `node --test bench-targets/react-state/useCartState.test.mjs` to verify: **1 test passed**.
