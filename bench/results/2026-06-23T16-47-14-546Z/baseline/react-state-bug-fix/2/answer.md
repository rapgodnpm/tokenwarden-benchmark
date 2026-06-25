The bug is clear: `addItem` mutates the state directly by assigning `const next = state` then calling `push` on it, violating immutability. The test confirms state should not be mutated.

Fix: Create a new object instead of reassigning the reference.







The fix is complete. Here's the summary:

**Bug:** `addItem` reassigned `const next = state` then mutated it with `push()`, directly modifying the input state object.

**Fix:** Return a new object with spread syntax (`...state`) instead of reassigning the old reference.

**Verification:** `node --test bench-targets/react-state/useCartState.test.mjs` — **1 pass, 0 fails**
