

Test pass.

**Bug:** Original parser treated all `--*` args as booleans.

**Fix:** Handle three cases:
1. `--key=value` → parse after `=`
2. `--key value` (next arg not starting with `--`) → capture as value, skip next
3. `--key` (standalone) → `true`

File: `bench-targets/cli-flags/src/parseArgs.mjs`
