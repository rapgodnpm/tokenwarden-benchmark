The bug is in `addItem`: it assigns `const next = state`, which makes `next` refer to the same object, then mutates the original state via `push`. The fix needs to create a new object with a new array.







**Fix applied to:** `bench-targets/react-state/src/useCartState.mjs`

**Bug:** `addItem` assigned `next = state` (same reference), then mutated via `push()`, violating immutability.

**Fix:** Create a new object with spread operator:
```javascript
const next = {
  items: [...state.items, item],
  total: state.total + 1
}
```

**Verification:**
```
node --test bench-targets/react-state/useCartState.test.mjs
# Result: pass 1, fail 0
```
