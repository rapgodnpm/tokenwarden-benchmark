The CLI argument parser has been fixed. Here's the summary:

**Fixed file:** `bench-targets/cli-flags/src/parseArgs.mjs`

**Test result:** ✅ Passing (1 test)

**Changes made:** Restructured the parser to handle all four cases correctly:
1. **Positional args** - anything not starting with `-` goes to `_.[]`
2. **`--key` boolean flags** - standalone `--flag` sets `result['flag'] = true`
3. **`--key value`** - `--flag` followed by non-`--` value sets `result['flag'] = value`
4. **`--key=value`** - equals syntax sets `result['flag'] = value`

**Verification:** Ran `node --test bench-targets/cli-flags/parseArgs.test.mjs` - all tests pass.
