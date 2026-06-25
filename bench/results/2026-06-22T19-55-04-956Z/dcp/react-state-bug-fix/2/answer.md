**Bug**: In `bench-targets/react-state/src/useCartState.mjs:6-8`, the `addItem` function used `const next = state` which mutates the original state object.

**Fix**: Changed to use shallow copy with immutable updates:
```javascript
const next = { ...state, items: [...state.items] }
```

**File modified**: `bench-targets/react-state/src/useCartState.mjs`

**Verification**: `node --test bench-targets/react-state/useCartState.test.mjs` passes (1 test, 0 failures)
