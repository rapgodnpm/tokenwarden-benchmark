

## Summary

**Bug Fixed:** State mutation in `addItem` function

**Root Cause:** `const next = state` created a reference to the same object instead of a new one, causing `next.items.push(item)` to mutate the original state.

**Fix Applied:** Changed to create a proper new state object with spread operator and a new items array.

### File Changed
- `/work/baseline-react-state-bug-fix-1/repo/bench-targets/react-state/src/useCartState.mjs`

### Verification Status
- **Command:** `node --test bench-targets/react-state/useCartState.test.mjs`
- **Result:** PASS (1 test passed, 0 failed)
