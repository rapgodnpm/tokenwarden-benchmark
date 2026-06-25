PROMPT: BENCHMARK_TASK cli-flag-parsing-fix

Reading parser implementation and test file...




















The test is failing because `--output` should store as `output` (without `--` prefix). I need to fix the equals syntax parsing to remove the `--` from the key:







**Fix Summary:**

The original parser only handled boolean flags (`--key`). I updated it to support:
- Boolean flags: `--verbose` → `verbose: true`
- Separate key/value: `--count 3` → `count: '3'`
- Equals syntax: `--output=dist` → `output: 'dist'`
- Positionals: Arguments not starting with `-` go to `_` array

**Verification:**
`node --test bench-targets/cli-flags/parseArgs.test.mjs` - **Passed** (1 test, passed)
