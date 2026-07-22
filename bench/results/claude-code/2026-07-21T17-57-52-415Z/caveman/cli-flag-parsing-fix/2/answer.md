

Parser fixed. Changes:

1. Handle `--key=value` syntax → extract key and value
2. Handle `--key value` pairs → assign next arg as value, skip it
3. Boolean-only flags (`--verbose`) → set to `true`
4. Non-flag args → push to `_.` array

Verified: `node --test bench-targets/cli-flags/parseArgs.test.mjs` passed.
