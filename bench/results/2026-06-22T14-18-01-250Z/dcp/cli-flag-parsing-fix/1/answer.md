I see the issue. The equals syntax `--output=dist` is being stored as `--output` instead of `output`. Let me fix the key parsing:










The positional argument is being skipped. The issue is the index increment logic - when we consume the next argument as a value, we're not accounting for the outer loop's increment. Let me fix this:







✅ Test passed. The fix was to correctly handle the `--key=value` syntax by slicing the key name properly (`arg.slice(2, equalsIndex)`) and to manage the index increment only when consuming a `--key value` pair (not for `--key=value` since the value is already inline).

**Summary:**
- **File modified:** `bench-targets/cli-flags/src/parseArgs.mjs`
- **Changes:**
  1. Fixed `--key=value` syntax: changed `arg.slice(2)` to `arg.slice(2, equalsIndex)` to correctly extract the key before the `=`
  2. Fixed index management: index only increments manually when using `--key value` syntax (when value is next arg and doesn't start with `--`); for `--key=value` syntax, the outer loop increment handles it
- **Command:** `node --test bench-targets/cli-flags/parseArgs.test.mjs`
- **Result:** ✅ Pass
