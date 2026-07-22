

## Summary

**Bug Fixed:** State mutation in `addItem` function.

**Root Cause:** The original code assigned `const next = state` and then mutated `next.items.push(item)`, which modified the original state object directly.

**Fix Applied:** Created a new state object with a spread copy of the items array and recalculated the total without mutating the original state.

---

**File Changed:** `bench-targets/react-state/src/useCartState.mjs`

**Verification Status:** ✅ Passing (1 test passed, 0 failed)
