

Fixed `parseArgs.mjs`. Bug: parser didn't handle `--key=value` syntax or skip next arg for `--key value`. Added check for `=` in key and next-arg value assignment.

**File edited:** `bench-targets/cli-flags/src/parseArgs.mjs`

**Command:** `node --test bench-targets/cli-flags/parseArgs.test.mjs`

**Verification:** Pass (1/1)
