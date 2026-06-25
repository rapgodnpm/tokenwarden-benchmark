The bug is in `useCartState.mjs:6-8`. The `addItem` function mutates the original state object by reassigning it to `next` and then calling `push` on it. This mutates the previous state instead of creating a truly new object.

Fix: Create a shallow copy of the state object before mutating:







Fixed state mutation bug.

**File:** `bench-targets/react-state/src/useCartState.mjs`

**Change:** Instead of reassigning `state` to `next` and mutating it, the fix spreads `state` into a new object and creates a new `items` array with the added item.

**Verification:** Test passed (`node --test bench-targets/react-state/useCartState.test.mjs`)
