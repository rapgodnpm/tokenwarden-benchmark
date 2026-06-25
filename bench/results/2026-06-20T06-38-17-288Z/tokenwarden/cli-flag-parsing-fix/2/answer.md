The current parser only handles simple boolean flags. It needs to be fixed to handle --key value pairs, --key=value syntax, and preserve positional arguments. Let me fix it:







The logic needs adjustment for the equals syntax detection:










The logic is still wrong. For `--output=dist`, I need to extract `output:` as the key, not `--output`. Let me fix this:













Test passed. Now I'll commit the changes:



































































**Fix complete. Test passes.**

**Summary:**
- Fixed `/bench-targets/cli-flags/src/parseArgs.mjs` to support all required CLI argument syntaxes
- **Boolean flags:** `--verbose` → `{verbose: true}`
- **Positional args:** `src/index.js` → `_.push('src/index.js')`
- **`--key value` space-separated:** `--count 3` → `{count: '3'}`
- **`--key=value` equals syntax:** `--output=dist` → `{output: 'dist'}`

**Implementation** (dependency-free, ~15 lines):
```javascript
export function parseArgs(argv) {
  const result = { _: [] }
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index]
    if (!arg.startsWith('--')) {
      result._.push(arg)
    } else if (arg.includes('=')) {
      // --key=value syntax
      const idx = arg.indexOf('=')
      result[arg.slice(0, idx).slice(2)] = arg.slice(idx + 1)
    } else if (argv[index + 1] && !argv[index + 1].startsWith('--')) {
      // --key value syntax  
      result[arg.slice(2)] = argv[index + 1]
      index += 1
    } else {
      // --key boolean
      result[arg.slice(2)] = true
    }
  }
  return result
}
```

**Verification:** `node --test bench-targets/cli-flags/parseArgs.test.mjs` → 1 test passing ✅
