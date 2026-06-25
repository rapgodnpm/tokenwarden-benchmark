The bug is a classic state mutation issue. In `useCartState.mjs`, `addItem` creates `next` as a reference to `state` (`next = state`), then mutates it directly with `next.items.push(item)`. This violates the test's immutability check (line 9 expects `state.items` to remain `[]`).

Fix by creating a new object and copying items:







Fix verified. The test now passes:

```
# tests 1
# pass 1
# fail 0
```

Changed `next = state` to `next = { items: [...state.items], total: 0 }` to create a proper immutable copy of the state.
