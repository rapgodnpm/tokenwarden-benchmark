The parser needs to handle three cases:
1. `--key=value` → `{key: value}`
2. `--key value` (space-separated) → `{key: value}`
3. `--key` → `{key: true}`







**Fix Summary:**

| Item | Value |
|------|-------|
| File changed | `bench-targets/cli-flags/src/parseArgs.mjs` |
| Command run | `node --test bench-targets/cli-flags/parseArgs.test.mjs` |
| Verification status | **PASS** (1/1 tests passed) |

**Changes made to parseArgs.mjs:**
1. Added `--key=value` detection with `split('=')` to extract value
2. Added `--key value` (space-separated) detection by checking next arg doesn't start with `--`
3. Kept `--key` as boolean (`true`)
4. Non-`--` args remain positionals
