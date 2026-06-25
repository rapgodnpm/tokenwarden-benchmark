I see the issues. The current parser is too simple—it only handles boolean flags (`--verbose`) but needs to support:
1. Boolean flags: `--verbose`
2. Key-value pairs (next arg): `--count 3` (value is next arg)
3. Key=value syntax: `--output=dist`
4. Positional arguments: pushed to `_`







The test expects `output` but the parser is storing `--output`. The flag name should strip the `--` prefix even in `--key=value` format. Let me fix that:







Test passed. Fixed:

**Issue**: In `--key=value` syntax, the key name included the `--` prefix, so `--output=dist` was stored as `[Object: '--output': 'dist']` instead of `[Object: 'output': 'dist']`

**Fix**: Changed `result[key] = value` to `result[key.substring(2)] = value` to strip the `--` prefix from the key name in equals syntax.

**Verification**: `node --test bench-targets/cli-flags/parseArgs.test.mjs` passes (1 test, 1 pass).
