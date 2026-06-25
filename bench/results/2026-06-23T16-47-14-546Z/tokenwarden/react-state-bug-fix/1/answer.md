The bug is clear: in `addItem`, line 6 does `const next = state` which creates a reference to the same object, causing mutation. I'll run the test first, then fix it.




Test fails as expected. The fix on line 6 needs to create a shallow copy:







**Verification complete: test passes**

**Changes made:**
- File: `bench-targets/react-state/src/useCartState.mjs`
  - Line 6: Changed `const next = state` to `const next = { ...state }`
  - Line 7: Changed `next.items.push(item)` to `next.items = [...state.items, item]`  
  - Line 8: Changed `next.total = state.items.length` to `next.total = next.items.length`

**Root cause:** The original code created a reference to the same object (`const next = state`), causing mutations on the original state to persist when testing compared the reference equality.
