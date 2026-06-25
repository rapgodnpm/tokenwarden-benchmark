**Fixed** the CLI argument parser in `bench-targets/cli-flags/src/parseArgs.mjs`.

**Changes made:**
- Updated the loop to use `i` with `i += 1` for manual increment control
- Added proper handling for `--key value` syntax by checking if next arg doesn't start with `--`
- Fixed `--key=value` parsing to correctly extract key and value using `indexOf('=')` to find the equals sign position, then slicing appropriately

**Verification:**
- Command: `node --test bench-targets/cli-flags/parseArgs.test.mjs`
- Status: **PASS** (1 test, 0 failures)
