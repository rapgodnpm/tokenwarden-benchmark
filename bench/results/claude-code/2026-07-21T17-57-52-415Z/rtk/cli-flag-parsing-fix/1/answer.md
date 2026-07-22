

All tests pass. Here's the summary:

## Fix Summary

**File Modified:** `bench-targets/cli-flags/src/parseArgs.mjs`

**Changes Made:**
The original parser only handled boolean flags (`--flag → true`) and positional arguments. The fix adds support for:

1. **`--key=value` syntax** - Splits on `=` and captures the value
2. **`--key value` pairs** - Detects when the next argument is not a flag and assigns it as the value
3. **Boolean flags** - Still works as before (`--flag → true`)
4. **Positional arguments** - Still handled correctly

**Verification Status:** ✅ PASS

```bash
node --test bench-targets/cli-flags/parseArgs.test.mjs
# Result: 1 test, 0 fail, 0 skipped
```
