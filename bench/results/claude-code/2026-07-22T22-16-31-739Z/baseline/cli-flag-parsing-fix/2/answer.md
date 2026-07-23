

The fix is complete. Here's the summary:

## Summary

**File modified:** `bench-targets/cli-flags/src/parseArgs.mjs`

**Changes made:**
1. Added handling for `--key value` syntax (flag followed by space-separated value)
2. Added handling for `--key=value` syntax (equals-separated key/value)
3. Positional arguments (non-`--` prefixed) are properly captured

**Commands run:**
```bash
node --test bench-targets/cli-flags/parseArgs.test.mjs
```

**Verification status:** ✅ **PASSED** - All 1 test(s) passed
