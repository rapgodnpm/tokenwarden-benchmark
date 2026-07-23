

The noisy output is now fixed. Verification passed.

## Summary

**Root cause**: `typecheck.mjs` had a loop iterating 60 times to repeat the same error message.

**Fix applied**: Removed the loop, replaced it with a single `console.error` call.

**File changed**: `/work/baseline-typecheck-flood-debug-1/repo/bench-targets/typecheck-flood/typecheck.mjs`

**Verification status**: ✅ Fixed - now outputs a single error message instead of 60 repetitions.
