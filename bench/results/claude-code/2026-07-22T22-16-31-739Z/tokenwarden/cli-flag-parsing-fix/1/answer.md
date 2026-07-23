

## Summary

**File modified:** `bench-targets/cli-flags/src/parseArgs.mjs`

**Changes made:**
The parser was updated to properly handle all syntax types:
1. **`--key=value` syntax** → splits on `=` to extract the value
2. **`--key value` syntax** → looks ahead at the next argument (if it doesn't start with `--`) to treat it as the value
3. **Boolean flags** (e.g., `--verbose`) → remain `true`
4. **Positional arguments** → pushed to the `_` array

**Verification:**
```
$ node --test bench-targets/cli-flags/parseArgs.test.mjs
```
**Status:** ✅ PASS (1 test passed, 0 failed)
