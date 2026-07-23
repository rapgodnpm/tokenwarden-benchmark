

## Summary

**Bug:** `addItem` mutated the original state object and incorrectly calculated `total`.

**Root causes:**
1. `const next = state` - shared object reference
2. `next.items.push(item)` - mutated original items array
3. `next.total = state.items.length` - used wrong array (0 instead of 1)

**Fix applied to `/work/context-mode-react-state-bug-fix-3/repo/bench-targets/react-state/src/useCartState.mjs`:**
```javascript
export function addItem(state, item) {
  const next = { ...state }          // shallow copy state
  next.items = [...state.items, item] // new items array
  next.total = next.items.length      // correct total
  return next
}
```

**Verification:**
```
$ node --test bench-targets/react-state/useCartState.test.mjs
# tests 1
# pass 1
# fail 0
```

Exports preserved: `addItem` and `createCartState`
