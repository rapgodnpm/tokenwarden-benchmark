

## Summary

**Fixed file**: `/private/tmp/tokenwarden-bench/claude-code/2026-07-21T17-57-52-415Z/rtk-cli-flag-parsing-fix-3/repo/bench-targets/cli-flags/src/parseArgs.mjs`

**Verification**: ✅ Pass (1 test, 0 failures)

**Changes made**:
1. Added support for `--key=value` syntax by splitting on `=` and extracting the value
2. Added support for `--key value` syntax by checking if the next argument doesn't start with `--`
3. Kept boolean flag support for standalone flags like `--verbose`
