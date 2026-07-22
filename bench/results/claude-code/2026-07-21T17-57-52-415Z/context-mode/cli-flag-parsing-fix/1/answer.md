

All tests pass. Here's the summary:

## Fix Summary

**File:** `bench-targets/cli-flags/src/parseArgs.mjs`

**Problem:** The original parser treated all `--flag` arguments as booleans and didn't handle:
1. `--key value` syntax (flag with next argument as value)
2. `--key=value` syntax (equals syntax)
3. Properly distinguishing boolean flags from flags that take values

**Changes Made:**
1. Changed `index += 1` inside the loop to be part of each branch (removed implicit increment)
2. Added `--key=value` syntax handling with proper key/value extraction
3. Added logic to consume the next argument as a value only if it doesn't start with `--` (to distinguish boolean flags from flags that take values)

**Verification Status:** ✅ Pass

```
node --test bench-targets/cli-flags/parseArgs.test.mjs
# Result: pass 1, fail 0
```
