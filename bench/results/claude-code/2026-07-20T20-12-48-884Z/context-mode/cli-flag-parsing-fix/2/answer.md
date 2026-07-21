

## Summary

**File fixed:** `bench-targets/cli-flags/src/parseArgs.mjs`

**Changes made:**
- Added handling for `--key=value` syntax by splitting on `=`
- Added look-ahead logic to capture values when `--key` is followed by a separate argument (e.g., `--count 3`)
- Kept standalone boolean flags (`--verbose`) working

**Command run:**
```bash
node --test bench-targets/cli-flags/parseArgs.test.mjs
```

**Verification status:** ✅ PASS (1 test passed)
