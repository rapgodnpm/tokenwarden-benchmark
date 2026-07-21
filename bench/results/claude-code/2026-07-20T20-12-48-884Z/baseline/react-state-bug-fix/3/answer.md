

## Summary

**Bug**: The `addItem` function in `bench-targets/react-state/src/useCartState.mjs` was mutating the original state object directly by calling `state.items.push(item)`.

**Fix**: Changed to create new immutable arrays and a new state object:
- `items: [...state.items, item]` - creates a new array with the spread operator
- `total: state.items.length + 1` - recalculates total instead of reusing `.length`

**File changed**: `bench-targets/react-state/src/useCartState.mjs`

**Verification**: 
```bash
node --test bench-targets/react-state/useCartState.test.mjs
```
**Result**: `pass 1, fail 0` ✓
