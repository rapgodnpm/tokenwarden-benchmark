Fixed state mutation bug in `useCartState.mjs`. The `addItem` function was mutating the `state.items` array directly instead of creating a new array. The fix uses spread operator to create proper immutable state copies. Changed the original mutation-based approach to copy-based approach for immutability.

Test status: **PASSED (1 test)**
