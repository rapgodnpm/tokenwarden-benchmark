

Fixed `parseArgs.mjs`:

**Changes:**
1. `--key=value` → slices `--` and `=` to extract key and value
2. `--key value` → looks ahead, consumes next arg if it doesn't start with `-`
3. Positionals → anything not starting with `--` goes to `_.`

**Verification:** `node --test bench-targets/cli-flags/parseArgs.test.mjs` passes (1/1 tests).
