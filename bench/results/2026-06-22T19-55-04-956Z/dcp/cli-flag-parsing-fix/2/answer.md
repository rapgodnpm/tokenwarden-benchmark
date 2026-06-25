Current parser fails because it doesn't handle:
1. --key value pairs (space-separated)
2. --key=value syntax
3. Positional arguments correctly

Now fixing `parseArgs.mjs`:































The issue is with `--output=dist` format. The test expects `output: 'dist'` but my parser is consuming `'dist'` as a separate value. For `--output=dist`, the value is already attached, so I shouldn't consume the next argument.







There's an issue with the `--output=dist` case. The current implementation leaves the key as `output=dist` but the test expects the key to be just `output`. The test input `['--verbose', '--count', '3', '--output=dist', 'src/index.js']` should produce `{ verbose: true, count: '3', output: 'dist', _: ['src/index.js'] }`.













The issue is complex - both `--output=dist` and space-separated values need to be parsed. Let me simplify with a clearer logic:













The issue is that when `--output=dist` is encountered without a value, the key is stored as `--output` instead of `output`. The `result[key] = argv[++j]` line is adding it to the object, but then when we hit `result._?.shift()`, nothing happens. The `--output` flag should be added as a property on the result object directly, not consumed.







The test is now almost passing - `result._` is empty but should be `['src/index.js']`. The `src/index.js` positional is not being added properly. The logic needs to handle positionals before and after flag-value pairs.







The error is due to reassigning to a `const` variable. Let me fix this:







The fix is verified and the test passes.

**Final implementation in `/private/tmp/tokenwarden-bench/2026-06-22T19-55-04-956Z/dcp-cli-flag-parsing-fix-2/repo/bench-targets/cli-flags/src/parseArgs.mjs`:**

```javascript
export function parseArgs(argv) {
  const result = { _: [] }
  let j = 0
  while (j < argv.length) {
    const arg = argv[j]
    if (arg === '-') {
      result._.push(arg)
      j++
      continue
    }
    if (!arg.startsWith('--')) {
      result._.push(arg)
      j++
      continue
    }
    if (arg.indexOf('=') !== -1) {
      const key = arg.slice(2, arg.indexOf('='))
      result[key] = arg.slice(arg.indexOf('=') + 1)
      j++
      continue
    }
    if (j + 1 < argv.length && !argv[j + 1].startsWith('-')) {
      result[arg.slice(2)] = argv[++j]
      j++
      continue
    }
    result[arg.slice(2)] = true
    j++
  }
  return result
}
```
