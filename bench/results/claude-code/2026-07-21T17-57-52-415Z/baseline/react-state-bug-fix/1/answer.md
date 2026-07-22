

## Summary

**Bug:** The `addItem` function in `useCartState.mjs` mutated the existing state object directly by calling `state.items.push(item)`, which violated React's immutability requirements.

**Fix:** Created a new state object with a shallow copy of the items array (`[...state.items, item]`) instead of mutating the original.

**File changed:**
- `bench-targets/react-state/src/useCartState.mjs`

**Verification:**
```
node --test bench-targets/react-state/useCartState.test.mjs
```
Result: **1 passed, 0 failed**
