

**Verification Status: ✅ PASS**

**Summary:**
- **File modified:** `bench-targets/cli-flags/src/parseArgs.mjs`
- **Command run:** `node --test bench-targets/cli-flags/parseArgs.test.mjs`
- **Result:** 1 test passed, 0 failed

**Changes made to `parseArgs.mjs`:**
The original parser incorrectly treated all `--key` arguments as boolean `true`. The fix adds support for:

1. **`--key value`** (space-separated) — captures the next non-`--` argument as the value
2. **`--key=value`** (equals syntax) — splits on `=` and assigns the value
3. **`--key`** (boolean) — sets to `true` when no value follows
4. **Positional arguments** — pushed to `_.array` when not starting with `--`
