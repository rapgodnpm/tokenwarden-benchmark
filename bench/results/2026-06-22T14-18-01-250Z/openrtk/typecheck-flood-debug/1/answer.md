I can see the noisy output - the loop from 0 to 59 with `index += 1` generates 60 identical repeated errors. The fix is to remove this loop and just emit the error once.







Fixed by removing the redundant loop that generated 60 duplicate errors, now emitting a single error.

**Files changed:**
- `bench-targets/typecheck-flood/typecheck.mjs`

**Commands run:**
```bash
node bench-targets/typecheck-flood/typecheck.mjs
```

**Verification status:** ✅ Single error emitted (was 60 repeated errors)
