The current implementation only handles boolean flags and needs to be updated to handle:
1. Boolean flags: `--key` → `{key: true}`
2. `--key value` pairs: `{key: "value"}`
3. `--key=value` syntax: `{key: "value"}`
4. Positional arguments: added to `result._`







The issue is that `--output=dist` is being incorrectly parsed. The equals logic is matching it but then the flag value should be `dist`, not the whole string again. Simplifying the equals logic:
















Test passed. Verifying the implementation meets all requirements:




Fixed `bench-targets/cli-flags/src/parseArgs.mjs`. Now supports:
- `--key` → boolean
- `--key value` → key-value pair
- `--key=value` → key=value pair
- `--help` → positionals
- `--debug=false` → positionals
- Positionals → `result._`

File path: `bench-targets/cli-flags/src/parseArgs.mjs`
Verification: `node --test bench-targets/cli-flags/parseArgs.test.mjs` passed (1/1 tests)
