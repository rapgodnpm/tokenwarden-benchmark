The current parser is broken:
1. It treats all `--` args as booleans
2. It doesn't handle `--key value` pairs or `--key=value` syntax

I need to fix it to properly handle all cases.







I see the issue. The logic for handling `--key value` pairs pushes the key first, then assigns the value incorrectly. I need to track positional arguments separately.

























The implementation is double-setting keys. Let me fix this:













Now the flags shouldn't be in the positional array. Let me fix:







The test passes. Let me verify the final implementation looks good and is production-ready:




The code has duplicate blocks for the same logic. Let me consolidate them:






















The file was replaced. Let me rewrite with a simpler implementation:







Test passes. Let me verify the final implementation:







The CLI argument parser is now fixed. File path: `bench-targets/cli-flags/src/parseArgs.mjs`

The implementation now correctly handles:
- **Boolean flags** (`--verbose`) - determined by checking if next arg starts with `--`
- **Equals syntax** (`--output=dist`) - parsed as key=value
- **Space-separated** (`--count 3`) - with lookahead for next arg
- **Positional arguments** - everything else goes to `_` array

Verification: `node --test bench-targets/cli-flags/parseArgs.test.mjs` passes all tests.
