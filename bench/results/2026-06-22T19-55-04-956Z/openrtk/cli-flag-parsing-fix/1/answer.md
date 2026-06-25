The CLI argument parser has been fixed. The parser now correctly:
1. Handles boolean flags (`--verbose` → `verbose: true`)
2. Handles `--key value` syntax (`--count 3` → `count: '3'`) 
3. Handles `--key=value` syntax (`--output=dist` → `output: 'dist'`)
4. Preserves positional arguments (`src/index.js` → `_`)

**Verification Status:** `OK` - All tests pass

**Changes made to `/private/tmp/tokenwarden-bench/2026-06-22T19-55-04-956Z/openrtk-cli-flag-parsing-fix-1/repo/bench-targets/cli-flags/src/parseArgs.mjs`:**
- Rewrote the parser logic to handle different argument formats
- Boolean flags stay boolean
- `--key value` pairs assign the value to the key
- `--key=value` assigns the value part after `=`
- Positional arguments (not starting with `-`) go into `result._`
- No external dependencies, small implementation (~12 lines)
