

## Summary

**Bug Location:** `bench-targets/react-state/src/useCartState.mjs`

**Issue:** The `addItem` function mutated the original `state` object by reusing its `items` array reference (`const next = state; next.items.push(item)`), violating immutability.

**Fix Applied:** Created a new object with a spread copy of the items array:
```javascript
const next = { items: [...state.items, item], total: state.items.length + 1 }
return next
```

**Verification Status:** ✅ PASS

```
ok 1 - addItem returns a new state object without mutating previous state
# tests 1 # pass 1 # fail 0
```
