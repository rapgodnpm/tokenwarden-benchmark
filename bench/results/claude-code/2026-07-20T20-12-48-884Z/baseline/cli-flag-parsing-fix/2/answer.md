

All tests pass. Here's the summary:

---

## Fix Summary

**File modified:** `/private/tmp/tokenwarden-bench/claude-code/2026-07-20T20-12-48-884Z/baseline-cli-flag-parsing-fix-2/repo/bench-targets/cli-flags/src/parseArgs.mjs`

**Problem:** The original parser incorrectly treated all `--` arguments as boolean flags and didn't handle `--key=value` or `--key value` syntax.

**Fix:** Added logic to:
1. Check for `--key=value` syntax and extract both key and value
2. Check for `--key value` (separate) syntax where the next non-`--` argument is the value
3. Keep boolean flag behavior for standalone `--key`

**Command run:**
```bash
node --test bench-targets/cli-flags/parseArgs.test.mjs
```

**Verification status:** ✅ **PASS** (1 test passed, 0 failed)
