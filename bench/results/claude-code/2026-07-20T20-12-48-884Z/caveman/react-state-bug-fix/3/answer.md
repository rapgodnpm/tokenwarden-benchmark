

**Bug fix complete.**

**Root cause:** `addItem` mutated the original state object with `const next = state`.

**Fix:** Create a fresh object with new `items` array and incremented `total`.

```javascript
export function addItem(state, item) {
  const next = {
    items: [...state.items, item],
    total: state.items.length + 1
  }
  return next
}
```

**Verification:** `node --test bench-targets/react-state/useCartState.test.mjs` passes (1 passed, 0 failed).
