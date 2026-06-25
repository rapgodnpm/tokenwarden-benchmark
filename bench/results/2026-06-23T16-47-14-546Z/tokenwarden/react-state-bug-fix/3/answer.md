I'll read the three files to understand the state update bug, then make a minimal fix.






Let me read the full files:






Now I can see the bug. In `useCartState.mjs`, the `addItem` function mutates the original `state` object by calling `state.items.push(item)` directly. This violates immutability.

**Bug**: Line 6-7 mutates `state.items` directly. The fix is to clone the items array before mutating.







**Fix completed.**

**Bug**: In `bench-targets/react-state/src/useCartState.mjs:6-7`, `addItem()` mutated `state.items.push(item)` directly, causing side effects.

**Change**: `bench-targets/react-state/src/useCartState.mjs`
- Create a new `items` array via `[...state.items]` clone instead of mutating
- Calculate `total` from the new array, not the old state
- Export unchanged

**Verification**: `node --test bench-targets/react-state/useCartState.test.mjs` passed (1 pass, 0 fail)
