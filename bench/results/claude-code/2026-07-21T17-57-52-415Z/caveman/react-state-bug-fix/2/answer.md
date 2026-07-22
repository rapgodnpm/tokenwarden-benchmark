

Fixed `bench-targets/react-state/src/useCartState.mjs` line 5-9.

`addItem` was mutating `state` directly. Now it creates a shallow copy with spread operator and new items array. Test passes.
