

The fix is verified. Here's a summary:

**Fixed file:** `/repo/bench-targets/cli-flags/src/parseArgs.mjs`

**Changes made:**
The original parser had two bugs:
1. It didn't handle `--key value` syntax (treated `--count` as boolean, ignoring the `3`)
2. It didn't parse `--key=value` properly (treated as boolean instead of key-value)

The fix adds proper handling for:
- **Boolean flags:** `--verbose` → `{verbose: true}`
- **Equals syntax:** `--output=dist` → `{output: 'dist'}`
- **Space-separated syntax:** `--count 3` → `{count: '3'}`
- **Positional arguments:** Anything not starting with `--` goes to `_.`

**Verification status:** ✅ Test passes

```bash
node --test bench-targets/cli-flags/parseArgs.test.mjs
```
