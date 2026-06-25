The current parser only handles boolean flags and ignores `--key value` pairs, `--key=value` syntax, and positional arguments. I'll fix it to support all required formats:


































Tests pass. The CLI argument parser has been fixed.

**Summary:**
- **File:** `bench-targets/cli-flags/src/parseArgs.mjs`
- **Changes:** Rewrote `parseArgs` to support:
  - Boolean flags (`--verbose` → `{verbose: true}`)
  - `--key=value` syntax (`--output=dist` → `{output: "dist"}`)
  - `--key value` syntax (`--count 3` → `{count: "3"}`)
  - Positional arguments (`src/index.js` → `_.push('src/index.js')`)
  - `--` separator for ending positional args
- **Status:** ✅ `node --test` all 1 test passing
