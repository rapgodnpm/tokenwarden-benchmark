

The test passes. Here's a summary:

## Fix Summary

**File edited:** `bench-targets/cli-flags/src/parseArgs.mjs`

**Problem:** The original parser treated all `--key` arguments as booleans and didn't properly handle `--key=value` syntax or `--key value` pairs.

**Changes made:**
1. Added support for `--key=value` syntax (e.g., `--output=dist`)
2. Added support for `--key value` syntax (e.g., `--count 3`) by checking if the next argument doesn't start with `--`
3. Kept boolean flag support (e.g., `--verbose`)

**Verification:**
```
node --test bench-targets/cli-flags/parseArgs.test.mjs
```
Result: **1 test passed**
