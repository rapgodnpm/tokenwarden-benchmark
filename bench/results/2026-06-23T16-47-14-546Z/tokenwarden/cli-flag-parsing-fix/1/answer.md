The parser only handles `--flag` with booleans. It's missing support for `--key value` and `--key=value` formats. Here's the fix:







**Fixed**: `bench-targets/cli-flags/src/parseArgs.mjs`

The parser now supports:
- Boolean flags: `--verbose`
- Key-value pairs: `--output=dist`
- Separated values: `--count 3`
- Positional arguments: `src/index.js`

**Verification**: `node --test bench-targets/cli-flags/parseArgs.test.mjs` - **1/1 test passed**
