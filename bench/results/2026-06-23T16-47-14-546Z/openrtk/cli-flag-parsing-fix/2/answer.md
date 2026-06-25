The current parser treats all `--` args as booleans and doesn't handle values. Let me fix it:







**Fix completed successfully.**

**File modified:** `bench-targets/cli-flags/src/parseArgs.mjs`

**Changes:**
- Added support for `--key=value` syntax by splitting on `=`
- Added support for `--key value` space-separated syntax by consuming the next argument
- Positional arguments now correctly pushed to `_.`
- Boolean flags still work when no value follows

**Verification status:**
```
node --test bench-targets/cli-flags/parseArgs.test.mjs
→ 1 passed, 0 failed
```
