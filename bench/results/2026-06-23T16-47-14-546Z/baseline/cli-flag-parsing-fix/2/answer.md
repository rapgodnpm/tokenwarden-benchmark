The current parser has these issues:
1. It treats all `--key` as booleans, ignoring values
2. It doesn't handle `--key=value` syntax
3. It doesn't properly separate flags from positional arguments







**Fixed.** The CLI argument parser now handles all required syntaxes.

**File path edited:**  
`bench-targets/cli-flags/src/parseArgs.mjs`

**Commands run:**  
```bash
node --test bench-targets/cli-flags/parseArgs.test.mjs
```

**Verification status:**  
✅ **PASS** - 1 test passed (0 failed)

The parser now correctly handles: boolean flags (`--verbose`), `--key value` pairs, `--key=value` syntax, and positional arguments.
