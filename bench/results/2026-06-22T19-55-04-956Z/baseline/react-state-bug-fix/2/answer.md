The bug is in `addItem`: it mutates the original `state.items` array (line 7), but JavaScript arrays are passed by reference, so the mutation affects the original state object. The test expects the state to remain unmutated.

Fix: Deep clone the items array instead of mutating the original:
















**Fix applied and verified:**

Root cause: `addItem` mutated `state.items` directly. Since arrays are passed by reference in JavaScript, this corrupted the original `state` object.

Fix: Clone the `items` array with spread operator (`...state.items`) instead of mutating the original.

**Commands run:**
```bash
node --test bench-targets/react-state/useCartState.test.mjs
```

**Status:** ✅ Pass (1 test, failed: 0)
