

The test passes.

**Summary:**

**File changed:** `bench-targets/cli-flags/src/parseArgs.mjs`

**Problem:** The original parser only handled `--key` as boolean flags and ignored both `--key value` and `--key=value` syntax.

**Fix:** Updated the parser to handle all three syntaxes:
1. `--flag` → sets `flag: true`
2. `--key=value` → sets `key` to the value after `=`
3. `--key value` (where next arg is not a flag) → sets `key` to the value

**Command run:** `node --test bench-targets/cli-flags/parseArgs.test.mjs`

**Verification status:** ✅ Passed (1 pass, 0 failures)
