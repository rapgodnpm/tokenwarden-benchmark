

File: `bench-targets/cli-flags/src/parseArgs.mjs`
Command: `node --test bench-targets/cli-flags/parseArgs.test.mjs`
Status: pass 1, fail 0

Fixed three bugs:
- `--key=value` now splits on `=` to extract value
- `--key value` consumes next arg as value (skips `--` args)
- `--key` alone remains boolean true
