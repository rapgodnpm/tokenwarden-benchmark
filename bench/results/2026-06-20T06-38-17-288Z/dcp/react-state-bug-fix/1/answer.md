**Fix Summary:**

Bug in `addItem()`: It mutated the same `state` object by reassigning `next = state` and then modifying `next.items`.

**Fix applied to** `bench-targets/react-state/src/useCartState.mjs`:
```mjs
// Before (buggy):
const next = state
next.items.push(item)
next.total = state.items.length
return next

// After (fixed):
const next = { ...state, items: [...state.items] }
next.items.push(item)
next.total = next.items.length
return next
```

This creates an immutable copy of the state with a new `items` array before pushing, preventing mutation of the original state object.

**Verification:**
```
node --test bench-targets/react-state/useCartState.test.mjs
# Result: PASS (1 test passed)
```
