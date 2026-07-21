

The bug is fixed and the test passes.

**Summary of changes:**

| File | Change |
|------|--------|
| `bench-targets/react-state/src/useCartState.mjs` | Fixed `addItem` to create immutable state updates |

**The fix** (line 6 in `useCartState.mjs`):
- `const next = state` → `const next = { ...state }` — creates a new object reference
- `next.items.push(item)` → `next.items = [...next.items, item]` — creates a new array instead of mutating
- `next.total = state.items.length` → `next.total = state.items.length + 1` — correctly calculates total after adding one item

**Verification status:** ✅ **PASS** (test runs successfully with `node --test bench-targets/react-state/useCartState.test.mjs`)
