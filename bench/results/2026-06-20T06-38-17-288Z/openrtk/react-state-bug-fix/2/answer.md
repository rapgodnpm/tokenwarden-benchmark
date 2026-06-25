The bug is in `addItem()` - it mutates the original state object because `const next = state` creates a reference, not a copy.







The test still fails - `total` needs to match `next.items.length`, not calculate from the original state before the push.







Fixed. Summary:
- Bug: `const next = state` created a reference to the same object, causing mutation of the original state
- Fix: Create a new object spread `items` and calculate `total` from the new object's items
- Verification: `node --test bench-targets/react-state/useCartState.test.mjs` passes (1 test, 0 failures)
