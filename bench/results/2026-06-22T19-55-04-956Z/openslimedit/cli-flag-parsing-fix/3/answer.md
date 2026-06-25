The current parser only handles boolean flags. It doesn't support:
1. `--key value` pairs (space-separated)
2. `--key=value` syntax
3. It doesn't skip options that start with `-` but aren't `--`

```js:5-7
// Replace with this logic:
// If starts with --: check for = value, otherwise boolean
// If starts with - (not --): push to positional
```







The test shows `--output` is being parsed as the key instead of `output`. I need to fix `arg.slice(0, equalsIndex + 1)` to remove the leading dashes.







Test passed. Running the full test suite for completeness:




**Verification Status: PASSED**

**File Path:** `bench-targets/cli-flags/src/parseArgs.mjs`

**Fix Summary:**
The parser now correctly supports all required CLI flag formats:
- Boolean flags: `--verbose` → `verbose: true`
- Space-separated value: `--count 3` → `count: '3'`
- Equals syntax: `--output=dist` → `output: 'dist'`
- Positional args: `src/index.js` → `_: ['src/index.js']`
- Single-dash args (`-v`) are pushed to positional array

All tests pass.
