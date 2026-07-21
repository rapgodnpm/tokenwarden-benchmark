

Test passes.

## Summary

**Fixed file:** `bench-targets/cli-flags/src/parseArgs.mjs`

**Changes:** The original parser treated all `--key` arguments as booleans. The fix adds support for:
1. `--key=value` syntax (e.g., `--output=dist` → `{ output: 'dist' }`)
2. `--key value` space-separated syntax (e.g., `--count 3` → `{ count: '3' }`)
3. Boolean flags remain unchanged (e.g., `--verbose` → `{ verbose: true }`)
4. Positional arguments are captured in `_.`

**Verification:**
```bash
cd bench-targets/cli-flags && node --test parseArgs.test.mjs
```
Result: **PASS** (1 test, 0 failures)
