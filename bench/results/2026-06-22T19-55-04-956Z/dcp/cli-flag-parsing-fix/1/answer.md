Now I understand the issue. The current parser only handles boolean flags (`--verbose`). It needs to support:
1. Boolean flags: `--verbose` → `{verbose: true}`
2. --key value pairs: `--verbose world --name=test` → `{verbose: true, name: 'test'}`
3. --key=value syntax: `--name=value` → `{name: 'value'}`
4. Positional arguments: push to `result._`

I'll fix the parser:







The parser stores keys with `--` prefix when using `--key=value` syntax. Need to strip the dashes from the key:







Fixed the CLI argument parser. The original implementation only supported boolean flags and ignored positional arguments. Fixed by:

1. Adding support for positional arguments (anything not starting with `--`)
2. Adding support for `--key value` pairs (flag separated from value by space)
3. Adding support for `--key=value` syntax
4. Stripping `--` prefix from keys

**File:** `bench-targets/cli-flags/src/parseArgs.mjs`
**Status:** ✅ Test passes
