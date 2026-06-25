The current parser has multiple bugs:
1. Line 5: All non-`--` args are pushed to `_` (but should handle flags first)
2. Line 6: Sets `--<name>` to boolean always, ignoring value
3. Does not support `--key value` syntax
4. Does not support `--key=value` syntax

Let me also check `result._` usage for the length check:







Now I'll fix the parser. The issue is:
1. It treats all `--<name>` as booleans, ignoring `--key value` and `--key=value` modes
2. It fails to properly handle `--key=value` syntax
3. It incorrectly consumes positional args that should be captured




Wait, that code is wrong. Let me rewrite it cleanly to handle all the cases:




Let me read the current file state first:




Now let me replace the entire file with a correct implementation:




Now let me run the verification test:




The issue is that `--output=dist` is being processed as key `'--output'` instead of `'output'`. I need to skip the leading dashes when parsing `--key=value`. Let me trace through the logic and fix this:







The issue is with loop flow - after `--count 3`, the loop breaks and doesn't process `'--output=dist'`. Let me rewrite with a cleaner while-loop approach:







Good progress! The flow is working, but `--output` key needs to have the `--` stripped. Let me fix the key extraction:







All tests pass. The fix correctly handles:
- Boolean flags: `--verbose` → `{ verbose: true }`
- Space-separated values: `--count 3` → `{ count: '3' }`
- Equals syntax: `--output=dist` → `{ output: 'dist' }`
- Positional args: `src/index.js` → `{ _: ['src/index.js'] }`

The key change was using a while-loop to properly track argument positions and handle flag-value pairing, which allows the parser to skip the value argument when using space-separated syntax.
