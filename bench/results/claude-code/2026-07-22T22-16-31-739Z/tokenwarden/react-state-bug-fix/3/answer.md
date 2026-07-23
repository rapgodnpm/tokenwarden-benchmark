

## Fix Complete

**Bug**: The `addItem` function was mutating the original state object by using `const next = state` (same reference) and `next.items.push(item)`.

**Fix**: Changed to create new objects/arrays instead of mutating:
- `const next = { ...state }` - creates a shallow copy
- `next.items = [...state.items, item]` - creates a new items array with the added item
- `next.total = next.items.length` - correctly uses the new length

**Files changed**:
- `bench-targets/react-state/src/useCartState.mjs`

**Verification**: ✅ Test passes
```
# pass 1
# fail 0
```
