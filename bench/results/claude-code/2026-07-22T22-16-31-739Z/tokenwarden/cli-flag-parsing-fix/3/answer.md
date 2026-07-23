

All tests pass. Here's the summary:

## Fix Summary

**File edited:** `bench-targets/cli-flags/src/parseArgs.mjs`

**Problem:** The original parser only treated all `--key` flags as booleans, ignoring:
1. `--key=value` syntax
2. `--key value` pairs (where value is the next argument)

**Solution:** Added logic to handle all three cases:
1. Arguments not starting with `--` → positional arguments
2. `--key=value` → extract key and value from equals syntax
3. `--key value` → look ahead and use next argument as value (skip incrementing index)
4. `--key` alone → boolean flag

## Commands Run & Verification

```bash
node --test bench-targets/cli-flags/parseArgs.test.mjs
```

**Result:** ✅ Pass (1 test, 0 failures)
