Test passed.

**Fix completed:** Modified `bench-targets/cli-flags/src/parseArgs.mjs` to properly handle:

1. **Boolean flags** (`--verbose`) - key assigned as `true`
2. **Key-value pairs** (`--count 3`) - key assigned the following value
3. **Equals syntax** (`--output=dist`) - key assigned the value after `=`

**Key changes:**
- Used while loop with index for proper lookahead
- Parse `--key=value` by slicing from index 2 (removing `--`) and up to `=`
- Determine if a `--flag` needs a value by checking if the next arg exists and doesn't start with `--`

**Verification status:** ✅ Pass (11/11 assertions)
