The test fails because `--output=dist` creates key `'output=dist'` instead of `'output'`. The issue is the equals sign is included in the key. I need to split on the `=`:







Still failing. The logic has a flaw with equals syntax before the flag name. Let me read the current file and rewrite the logic to properly handle `--key=value`:




The issue is the `--key=value` is being treated as a flag followed by a value (since the equals is included in the flag). I need to check for equals syntax in the flag itself first, before checking for next argument:







Now the key is `'output=dist'` because I'm using `key` which already contains `=`. Need to split the key from value when `=` exists:







✅ Verification passed - Test passes with 1 passed.

**Fix summary:**
- **File modified:** `bench-targets/cli-flags/src/parseArgs.mjs`
- **Changes:** Rewrote the parser to support:
  - Boolean flags: `--verbose` → `{verbose: true}`
  - Positional args: `src/index.js` → pushed to `_` array
  - Space-separated values: `--count 3` → `{count: "3"}`
  - Equals syntax: `--output=dist` → `{output: "dist"}`
- **Verification:** `node --test bench-targets/cli-flags/parseArgs.test.mjs` — **passed**
