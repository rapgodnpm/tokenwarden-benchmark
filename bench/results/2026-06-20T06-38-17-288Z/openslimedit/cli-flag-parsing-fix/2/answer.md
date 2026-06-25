The current parser only handles boolean flags. It doesn't handle `--key value` pairs or `--key=value` syntax. I'll fix it:







The equals syntax isn't parsing correctly - it's keeping `=` in the key. Let me fix:







**Verification status: ✓ Pass**

**Summary:**
Fixed `bench-targets/cli-flags/src/parseArgs.mjs`:
- Added `--key value` handling (checks next arg doesn't start with `-`)
- Added `--key=value` handling (splits on `=` and extracts the key part)
- Kept `--key` boolean handling
- Retained positional argument handling

The parser now correctly handles all required CLI argument patterns.
