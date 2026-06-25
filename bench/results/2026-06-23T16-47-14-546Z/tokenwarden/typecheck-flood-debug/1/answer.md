The issue is in `typecheck.mjs` - it loops 60 times printing the same error. The simple fix is to remove the loop and emit the error only once.







**Verification complete**

**Files changed:**
- `bench-targets/typecheck-flood/typecheck.mjs` - Removed the repetitive loop (60 iterations) on lines 6-8, changed to emit error once

**Command run:**
```
node bench-targets/typecheck-flood/typecheck.mjs
```

**Verification status:**  
- Before: 60 identical error messages
- After: Single error message emitted correctly
