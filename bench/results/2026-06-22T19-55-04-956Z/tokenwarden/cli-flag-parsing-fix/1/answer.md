The current parser is too simple - it only handles boolean flags but doesn't support `--key value` pairs, `--key=value` syntax, or properly separate positional arguments from flags.

The test expects:
- `--verbose` → `{ verbose: true }` (boolean flag)
- `--count 3` → `{ count: '3' }` (key-value pair, space-separated)
- `--output=dist` → `{ output: 'dist' }` (key=value syntax)
- Positional arguments like `src/index.js` → `_: ['src/index.js']`

Let me rewrite the parser to handle all cases:







The equals syntax isn't parsing the key correctly - `--output=dist` should result in `output: 'dist'`, not `output=dist: ''`. Let me fix the logic to handle the equals syntax properly - it should extract the key up to the `=` and the value after the `=`:







Fixed `bench-targets/cli-flags/src/parseArgs.mjs`. The original parser only supported boolean flags. Added support for:
- `--key value` (space-separated)
- `--key=value` (equals syntax)  
- Positional arguments

Command: `node --test bench-targets/cli-flags/parseArgs.test.mjs`
Status: ✅ passing (1/1)
