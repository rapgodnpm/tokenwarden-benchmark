

## Summary

**Bug:** The `addItem` function in `bench-targets/react-state/src/useCartState.mjs` was mutating the original state object by directly calling `state.items.push(item)`, violating React's immutability requirement.

**Fix:** Changed to immutable update pattern that creates a new state object with a new items array.

### Verification

- **Test status:** ✅ Pass
- **Command run:** `node --test bench-targets/react-state/useCartState.test.mjs`
- **Exports preserved:** ✅ `addItem` and `createCartState` both exported

**File changed:**
- `bench-targets/react-state/src/useCartState.mjs`
