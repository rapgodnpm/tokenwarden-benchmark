The parser currently doesn't handle `--key value` pairs, `--key=value` syntax, or properly categorize arguments. It treats all `--` prefixed arguments as booleans and mishandles argument parsing order.







The key extraction for `--key=value` is stripping the `--` prefix. I need to fix that.







The key still includes the full `--output=dist` string. I need to extract just the key part before the `=` sign.







**Fix applied to `/private/tmp/tokenwarden-bench/2026-06-20T06-38-17-288Z/tokenwarden-cli-flag-parsing-fix-3/repo/bench-targets/cli-flags/src/parseArgs.mjs`**

The parser now correctly handles:
- `--flag` → boolean true
- `--flag value` → string value
- `--flag=value` → string value
- `-flag` (single dash) → boolean true
- `-flag value` → string value
- Positional arguments → `result._`

**Verification:** `node --test bench-targets/cli-flags/parseArgs.test.mjs` - **PASS** (1 test passed)
