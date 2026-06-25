The current parser has two issues:
1. It doesn't handle `--key value` syntax (flag followed by value as separate args)
2. It doesn't handle `--key=value` syntax

Let me fix the parser:







**Fixed file:** `bench-targets/cli-flags/src/parseArgs.mjs`

**Changes:**
- Added support for `--key=value` syntax (parses as key with value)
- Added support for `--key value` syntax (parses flag followed by positional value)
- Boolean flags (like `--verbose`) still work as before
- Positional arguments (without `--`) are collected in `._`

**Command run:**
```
node --test bench-targets/cli-flags/parseArgs.test.mjs
```

**Verification status:** ✓ 1 test passed
