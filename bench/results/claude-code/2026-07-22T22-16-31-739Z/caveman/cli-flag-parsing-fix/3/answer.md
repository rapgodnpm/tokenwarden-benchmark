

**Fix applied to:** `/work/caveman-cli-flag-parsing-fix-3/repo/bench-targets/cli-flags/src/parseArgs.mjs`

**Changes:**
1. Handle `--key=value` syntax by splitting at `=`
2. Handle `--key value` syntax when next arg is not a flag
3. Keep positional arguments in `result._`

**Verification:** `node --test bench-targets/cli-flags/parseArgs.test.mjs` → 1 pass, 0 fail
