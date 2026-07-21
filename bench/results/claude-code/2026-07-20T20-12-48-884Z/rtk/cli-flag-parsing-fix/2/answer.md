

## Summary

**Fixed file:** `/private/tmp/tokenwarden-bench/claude-code/2026-07-20T20-12-48-884Z/rtk-cli-flag-parsing-fix-2/repo/bench-targets/cli-flags/src/parseArgs.mjs`

**Problem:** The original parser treated all `--key` arguments as boolean flags (always `true`), ignoring actual values.

**Solution:** Updated the parser to handle:
1. `--key=value` syntax → extracts value after `=`
2. `--key value` syntax → captures next non-`--` argument as value
3. `--key` alone → boolean `true`
4. Positional arguments → pushed to `result._` array

**Verification status:** ✅ All tests pass (`node --test bench-targets/cli-flags/parseArgs.test.mjs`)
