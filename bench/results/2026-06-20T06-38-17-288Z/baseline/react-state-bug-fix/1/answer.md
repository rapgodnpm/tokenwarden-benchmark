Fixed the state update bug by changing `addItem` to create a new state object instead of mutating the existing one. The bug was line 6-7 in useCartState.mjs (`const next = state` and `next.items.push(item)`), which violated immutability. The fix creates a new object with all items copied:

```javascript
const next = {
  ...state,
  items: [...state.items, item],
  total: state.items.length + 1,
}
```

**Summary**:
- **File changed**: `bench-targets/react-state/src/useCartState.mjs`
- **Status**: ✅ Test passes
- Command: `node --test bench-targets/react-state/useCartState.test.mjs`
