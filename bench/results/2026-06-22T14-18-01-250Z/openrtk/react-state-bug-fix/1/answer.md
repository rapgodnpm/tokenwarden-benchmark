**File path:** `bench-targets/react-state/src/useCartState.mjs`

**Issue:** The `addItem` function was mutating the shared `state` object directly by reusing the same reference (`const next = state`), violating the immutability requirement in the test.

**Fix:** Created a shallow copy of the state with a new `items` array, ensuring the original state remains unchanged:
```javascript
const next = { ...state, items: [...state.items] }
```

**Command:** `node --test bench-targets/react-state/useCartState.test.mjs`

**Verification status:** Pass (1 test passed)
