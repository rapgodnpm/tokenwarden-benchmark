The bugs are clear:
1. Does not handle `--key=value` syntax
2. Does not handle `--key value` (separate value)
3. Does not properly separate positional arguments

Let me fix the parser:







The key extraction is wrong—it includes the `=`. Need to slice from the last `=`:







**Fix Summary:**

**Changed:** `bench-targets/cli-flags/src/parseArgs.mjs`

The parser now correctly handles:
1. **Boolean flags**: `--verbose` → `verbose: true`
2. **Key-value pairs with space**: `--count 3` → `count: '3'`
3. **Equals syntax**: `--output=dist` → `output: 'dist'`
4. **Positional arguments**: `src/index.js` → pushed to `_` array

**Key fix:** Extract key from `--key=value` by taking the portion between `--` and the `=` sign using `arg.slice(2, equalsIndex)`.

**Verification:** `node --test bench-targets/cli-flags/parseArgs.test.mjs` → **PASS**
