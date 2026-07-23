

**Summary**

| File | Change |
|------|--------|
| `bench-targets/react-state/src/useCartState.mjs` | Fixed `addItem` to return a new state object instead of mutating the input |

**Bug**: The original `addItem` function assigned `state` to `next`, then mutated `state.items.push(item)`, causing the original state to be mutated.

**Fix**: Created a new state object with spread syntax (`[...state.items, item]`) and computed the new total as `state.items.length + 1`.

**Verification**: `node --test bench-targets/react-state/useCartState.test.mjs` - 1 pass, 0 failures.
