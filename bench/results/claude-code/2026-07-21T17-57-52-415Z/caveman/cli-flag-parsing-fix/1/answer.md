

**Fix complete.**

**File edited:** `bench-targets/cli-flags/src/parseArgs.mjs`

**Changes:**
1. Added positional argument handling (args not starting with `--` go to `_`)
2. Added `--key=value` parsing using `indexOf('=')` to split correctly
3. Added `--key value` pairing: next non-`--` arg becomes the value

**Command run:**
```
node --test /private/tmp/tokenwarden-bench/claude-code/2026-07-21T17-57-52-415Z/caveman-cli-flag-parsing-fix-1/repo/bench-targets/cli-flags/parseArgs.test.mjs
```

**Verification status:** 1/1 test passed
