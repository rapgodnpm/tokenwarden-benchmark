

All tests pass.

**Fix summary:**

| File | Change |
|------|--------|
| `bench-targets/cli-flags/src/parseArgs.mjs` | Fixed 3 bugs |

**Bugs fixed:**
1. `--key=value` syntax now parses value correctly
2. `--key value` syntax now captures value (was going to positional array)
3. Key extraction uses `arg.slice(2)` to remove `--` prefix

**Verification:**
```bash
node --test bench-targets/cli-flags/parseArgs.test.mjs
```
Result: 1 test passed
