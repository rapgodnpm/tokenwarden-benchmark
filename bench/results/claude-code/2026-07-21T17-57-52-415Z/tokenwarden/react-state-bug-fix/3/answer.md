

The fix is complete and verified.

**Summary:**
- **File changed:** `bench-targets/react-state/src/useCartState.mjs`
- **Bug:** `addItem` was mutating the original state object by assigning `const next = state` (same reference), then calling `next.items.push(item)`.
- **Fix:** Created a new state object with spread syntax to avoid mutation:
  ```javascript
  return { items: [...state.items, item], total: state.items.length + 1 }
  ```
- **Verification:** `node --test bench-targets/react-state/useCartState.test.mjs` — passed (1 test)
