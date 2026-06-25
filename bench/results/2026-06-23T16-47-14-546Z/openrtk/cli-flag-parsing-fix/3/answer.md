The current parser has bugs:
1. Treats ALL `--key` flags as booleans, missing value parsing
2. Doesn't handle `--key=value` syntax
3. Doesn't handle `--key value` (separate value) syntax

Let me fix it:







The logic error: `--verbose` also starts with `-` (since `--` begins with `-`). I need to fix the condition:







The `count: '3'` value is ending up in `_`. The issue is after consuming the value, we continue the loop which processes the value again. Need to properly skip the value argument:







I'm using `arg` instead of `key`. Let me fix:







The `indexOf('=')` returns -1 which breaks `slice`. Need to handle no-equals case:










Let me view the full file to debug:




The bug is the for loop's own `index += 1` runs after the manual `index += 1`. Need to use a while loop or prevent double increment:







`'3'` is still being pushed to `_`. The issue is after consuming the value, we need to also skip that argument in the main loop. Let me fix:







All tests pass. Here's the final implementation:

**File:** `bench-targets/cli-flags/src/parseArgs.mjs`

```javascript
export function parseArgs(argv) {
  const result = { _: [] }
  const length = argv.length
  let index = 0
  while (index < length) {
    const arg = argv[index]
    if (!arg.startsWith('--')) {
      result._.push(arg)
      index += 1
      continue
    }
    const eqIndex = arg.indexOf('=')
    if (eqIndex !== -1) {
      const key = arg.slice(2, eqIndex)
      const value = arg.slice(eqIndex + 1)
      result[key] = value
      index += 1
    } else {
      const key = arg.slice(2)
      index += 1
      if (index < length && !argv[index].startsWith('--')) {
        index += 1
        result[key] = argv[index - 1]
      } else {
        result[key] = true
      }
    }
  }
  return result
}
```

**Commands run and verification status:**
- `node --test bench-targets/cli-flags/parseArgs.test.mjs` - **PASSED** (1 test passed, 0 failed)
