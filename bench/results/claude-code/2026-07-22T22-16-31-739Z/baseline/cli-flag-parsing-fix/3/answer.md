

The test passes. 

**Summary:**

**File modified:** `/work/baseline-cli-flag-parsing-fix-3/repo/bench-targets/cli-flags/src/parseArgs.mjs`

**Changes made:**
1. Added support for `--key=value` syntax by detecting `=` and extracting key/value parts
2. Added support for `--key value` syntax by capturing the next non-flag argument as the value
3. Preserved boolean flag behavior for flags like `--verbose` that stand alone

**Verification:**
```
$ node --test bench-targets/cli-flags/parseArgs.test.mjs
ok 1 - parseArgs handles booleans, values, equals syntax, and positionals
tests 1, pass 1, fail 0
```
