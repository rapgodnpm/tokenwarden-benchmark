The bug is in `addItem` function. It reassigns `const next = state`, making `next` reference the same object as `state`. When `next.items.push(item)` is called, it mutates the original state.

The fix is to create a copy of the object and copy the array to avoid shared references:







The test expects `next.total === 1` but it's 0 because I used `state.items.length` before the item was added. I should use `next.items.length`:







Test passes. Final change was minimal - just two edits:
1. Added `const next = { ...state }` instead of `const next = state` to avoid mutating the original object
2. Changed `next.items = [...state.items]` to ensure a new array copy
3. Changed `next.total = state.items.length` to `next.total = next.items.length` to compute total after the item was added
