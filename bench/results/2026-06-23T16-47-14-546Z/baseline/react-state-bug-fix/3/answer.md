The bug is in `useCartState.mjs` at line 6: `const next = state` creates a reference to the same object, not a copy. This mutates the original state when `push()` is called.

Fix: Create a proper copy with `const next = { ...state }` and create a new items array.







The assertion at line 12 fails because `state.items.length` returns 0 at that point (since `state` is unchanged). The fix should use `next.items.length` after the push, or calculate before pushing. Let me fix:







**Verification Status: PASS**

**Bug summary (`useCartState.mjs:6`):**
- Original: `const next = state` → created a reference, not a copy
- Original: `next.total = state.items.length` → mutated state before reading length

**Fix (minimal change):**
1. `const next = { ...state }` → creates shallow copy
2. `next.items = [...state.items]` → creates new items array
3. `next.total = next.items.length` → reads updated length after push

**File changed:** `bench-targets/react-state/src/useCartState.mjs`
