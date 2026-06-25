The test fails because the parser doesn't handle:
1. `--key=value` syntax (currently treats as boolean)
2. Flags with following values (collects next arg as value, not key)
3. Positional arguments should accumulate in `_`

Fix by properly parsing flags that have key/value pairs and advancing the index:







The logic is broken. `--count` and `--verbose` are separate flags but the next arg after `--verbose` is `--count` which should be treated as the VALUE (boolean true), not skipped entirely:













The key extraction is wrong—`slice(2)` should be `slice(2, arg.includes('=') ? -1 : undefined)`:













The key for `--verbose` (no equals) should store `'verbose'` not `'--verbose'`:













For boolean flags without `=`, strip the leading dashes from the key:










Fixed and verified. The parser now correctly handles boolean flags (`--verbose`), `--count value` pairs, and `--key=value` syntax.

**Fix applied to** `bench-targets/cli-flags/src/parseArgs.mjs`:
- Boolean flags: key extracted without leading dashes (`--verbose` → `verbose`)
- `--key value` syntax: consumes next non-flag argument as value, skips both
- `--key=value` syntax: parses key and value from the equals pair

**Verification**: `node --test bench-targets/cli-flags/parseArgs.test.mjs` - **1 test passed**
