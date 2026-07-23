

## Summary

**Fixed file:** `/work/tokenwarden-cli-flag-parsing-fix-2/repo/bench-targets/cli-flags/src/parseArgs.mjs`

**Changes made:**
1. Added support for `--key=value` syntax by detecting `=` in arguments and splitting on it
2. Added support for `--key value` syntax by checking if the next argument doesn't start with `--`

**Verification:**
- `node --test bench-targets/cli-flags/parseArgs.test.mjs` - **PASS** (1/1 tests passed)
- Manual verification confirms:
  - Boolean flags: `--verbose` → `verbose: true`
  - Key-value pairs: `--count 3` → `count: '3'`
  - Equals syntax: `--output=dist` → `output: 'dist'`
  - Positional args: `src/index.js` → `_: ['src/index.js']`
