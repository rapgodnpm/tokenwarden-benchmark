

**Fix applied**

**File:** `/private/tmp/tokenwarden-bench/claude-code/2026-07-21T17-57-52-415Z/caveman-react-state-bug-fix-1/repo/bench-targets/react-state/src/useCartState.mjs`

**Bug:** `addItem` mutated `state.items` directly instead of creating a new array.

**Fix:** Replace mutation with immutable spread `[...state.items, item]` and correct total calculation.

**Commands:**
```
node --test bench-targets/react-state/useCartState.test.mjs
```

**Status:** `pass 1 / fail 0`. Exports unchanged.
