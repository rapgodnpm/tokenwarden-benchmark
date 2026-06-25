I can see the issues. The parser needs to handle:
1. `--key value` pairs (flag with a value that follows)
2. `--key=value` syntax
3. Positional arguments (into `result._`)

Currently it treats all `--` args as booleans, doesn't handle `equals` syntax, and doesn't capture values that follow flags.

Let me fix the parser:







Fixed the parser. Changes made:
- Added `--key=value` splitting
- Added handling for `--key` with a value on the next non-flag argument
- Positional arguments still go to `result._`

Verified with tests: **pass** (1/1)
