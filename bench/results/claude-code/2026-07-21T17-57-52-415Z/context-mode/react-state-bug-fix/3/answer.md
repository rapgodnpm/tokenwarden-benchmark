

**Fix Summary:**

**File edited:** `bench-targets/react-state/src/useCartState.mjs`

**Bug:** `addItem` mutated the original state object because `const next = state` assigned the same reference.

**Fix:** Created a new immutable state object using object spread.

**Verification:**
```bash
node --test bench-targets/react-state/useCartState.test.mjs
```
Result: **PASS** (1 test passed)
