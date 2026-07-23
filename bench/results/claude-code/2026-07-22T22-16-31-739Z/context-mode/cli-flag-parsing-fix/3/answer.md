

## Summary

**Issue:** The original parser treated all `--key` arguments as boolean flags, ignoring value assignments.

**Fix Applied:** Updated `/work/context-mode-cli-flag-parsing-fix-3/repo/bench-targets/cli-flags/src/parseArgs.mjs`

**Changes made:**
1. Handle `--key=value` syntax by splitting on `=` 
2. Handle `--key value` (space-separated) by consuming the next non-`--` argument
3. Keep `--key` as boolean `true` when no value follows

**Verification:**

```
$ node --test bench-targets/cli-flags/parseArgs.test.mjs
TAP version 13
# Subtest: parseArgs handles booleans, values, equals syntax, and positionals
ok 1 - parseArgs handles booleans, values, equals syntax, and positionals
...
# tests 1
# pass 1
# fail 0
```

**Status:** ✅ Test passes
