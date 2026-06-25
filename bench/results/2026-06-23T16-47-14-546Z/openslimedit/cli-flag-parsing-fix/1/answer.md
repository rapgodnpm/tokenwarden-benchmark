**File fixed:** `bench-targets/cli-flags/src/parseArgs.mjs`

**Changes made (3 additions):**
1. Handle `--key=value` syntax by splitting on `=` and storing the value
2. Handle `--key value` syntax by reading the next non-`--` argument as the value
3. Positional arguments (not starting with `--`) are collected in the `_` array

**Commands run:**
```bash
node --test bench-targets/cli-flags/parseArgs.test.mjs
```

**Verification status:** ✅ Passed (1 test, 1 pass, 0 fail)
