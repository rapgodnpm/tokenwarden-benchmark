

**Bug:** `addItem` mutates the input state object directly.

**Fix:** In `bench-targets/react-state/src/useCartState.mjs`, create a new state object using spread operator instead of mutating the existing one.

**Status:** Test passes
