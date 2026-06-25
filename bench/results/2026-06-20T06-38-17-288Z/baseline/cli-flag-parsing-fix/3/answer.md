The current parser only handles boolean flags but the test expects support for:
1. Boolean flags (`--verbose` -> `verbose: true`)
2. --key value pairs (`--count 3` -> `count: '3'`)
3. --key=value syntax (`--output=dist` -> `output: 'dist'`)
4. Positional arguments (`src/index.js` -> `_`)

I'll rewrite the parser to handle all cases:







The test failed - `--output=dist` is being stored with the `--` prefix. Need to fix the key extraction:




That rewrite is too complex. Let me simplify:




I notice I'm using `unescape` but it may not be imported. Let me check and fix:




Test passed. However, I'm calling `unescape()` but have not defined it. I need to add the unescape function:







Final test passed. Here's the summary:

**Files modified:**
- `bench-targets/cli-flags/src/parseArgs.mjs`

**Changes made:**
1. Added `unescape()` helper function to strip backslashes
2. Rewrote `parseArgs()` to handle all required cases:
   - Boolean flags: `--verbose` → `{verbose: true}`
   - Positional args: `src/index.js` → `_`
   - `--key value` syntax: `--count 3` → `{count: '3'}`
   - `--key=value` syntax: `--output=dist` → `{output: 'dist'}`

**Verification status:**
```
# tests 1
# pass 1
# fail 0
```
