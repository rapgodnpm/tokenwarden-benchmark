The current parser only marks `--key` as boolean true, but doesn't handle `--key value` or `--key=value` syntax. I'll fix it:







**Verification Status: PASS**

- **File modified**: `bench-targets/cli-flags/src/parseArgs.mjs`
- **Test command**: `node --test bench-targets/cli-flags/parseArgs.test.mjs`
- **Result**: 1 test passed, 0 failed
