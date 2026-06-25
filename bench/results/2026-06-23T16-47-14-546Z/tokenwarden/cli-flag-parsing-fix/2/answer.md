The current parser is incomplete. It needs to support:
- `--key value` pairs (space-separated)
- `--key=value` syntax
- Boolean flags like `--verbose`

Let me run the test first to see the current failure:




The issues are clear:
1. `--count 3` isn't splitting the value
2. `--output=dist` isn't splitting on `=`

I'll fix the parser:







Test passed.

**Fix applied to** `bench-targets/cli-flags/src/parseArgs.mjs`:

Added support for:
- `--key=value` syntax (split on `=`)
- `--key value` pairs (consume next arg if it's not a flag)
- Boolean flags (previous behavior)
- Positional arguments (anything not starting with `--`)

**Command run:** `node --test bench-targets/cli-flags/parseArgs.test.mjs`

**Verification status:** pass (1/1)
