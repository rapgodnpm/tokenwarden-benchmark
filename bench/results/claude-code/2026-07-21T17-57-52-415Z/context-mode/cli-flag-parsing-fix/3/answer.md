

## Summary

| Item | Detail |
|------|--------|
| **File edited** | `bench-targets/cli-flags/src/parseArgs.mjs` |
| **Issue** | Parser treated all `--key` arguments as booleans, ignoring values and equals syntax |
| **Fix** | Added logic to handle: 1) `--key=value` syntax, 2) `--key value` (next arg if not a flag), 3) `--key` alone (boolean) |
| **Verification** | `node --test bench-targets/cli-flags/parseArgs.test.mjs` → **1 pass, 0 fail** |

**Changes made:**
- Check for `=` in argument → split into key/value
- Check if next arg exists and doesn't start with `--` → treat as value
- Otherwise → boolean flag
