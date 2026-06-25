I'll start by reading the parser implementation and test file to understand the issue.





Now I understand the issue. The current parser only handles boolean flags (--verbose, --count) but the test expects support for:
1. Boolean flags (`--verbose`, `--count`) ✓
2. `--key value` pairs (`--output dist`) ✗
3. `--key=value` syntax (`--output=dist`) ✗
4. Positional arguments (`src/index.js`) ✓

The parser needs to be fixed to handle `--key value` pairs and `--key=value` syntax. Let me fix it:




Now let me verify the fix runs the test:




Fixed. The parser now supports all required syntax:
- Boolean flags: `--verbose` → `{ verbose: true }`
- `--key value` pairs: `--count 3` → `{ count: '3' }`
- `--key=value` syntax: `--output=dist` → `{ output: 'dist' }`
- Positional arguments: preserved in `result._`

**File changed:**
- `bench-targets/cli-flags/src/parseArgs.mjs`

**Changes made:**
1. Added support for `--key=value` by checking `indexOf('=')`
2. Added `continue` after pushing positional args to prevent double-pushing
3. Added logic to detect `--key value` pairs by checking if the next argument doesn't start with `--`

**Verification status:** ✅ All tests passing
