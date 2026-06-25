**Root cause**: The code loop at `bench-targets/typecheck-flood/typecheck.mjs:6-8` intentionally emitted the same error 60 times (index 0 to 59, incrementing by 1).

**Fix**: Removed the for loop, keeping only the single `console.error` call.

**Command run**: `node bench-targets/typecheck-flood/typecheck.mjs`

**Verification status**: ✅ Fixed - now outputs only 1 error (previously 60).
