**Fix Summary:**

**File modified:** `bench-targets/cli-flags/src/parseArgs.mjs`

**Changes made:**
- Added support for `--key=value` syntax by splitting on `=` and storing value
- Added support for separated positional args by checking `--key nextArg` syntax  
- Moved positional arguments to a separate `positional` array that gets appended to `._`
- Fixed key names by stripping leading `--` prefix

**Commands run:**
```bash
node --test bench-targets/cli-flags/parseArgs.test.mjs
```

**Verification status:** ✅ **PASSED** (1 test passed)
