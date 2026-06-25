Fixed the CLI argument parser in `/private/tmp/tokenwarden-bench/2026-06-22T19-55-04-956Z/baseline-cli-flag-parsing-fix-2/repo/bench-targets/cli-flags/src/parseArgs.mjs`.

**Issues fixed:**
1. Boolean flags now correctly set `result['flag'] = true` instead of `result['--flag'] = true`
2. `--key value` syntax now properly captures the key-value pair and skips both arguments
3. `--key=value` syntax now properly extracts the key (without `=`) and value
4. Positional arguments are correctly placed in `result._`

**Verification:**
```
node --test bench-targets/cli-flags/parseArgs.test.mjs
# tests 1, pass 1
```

Test status: **PASSED**
