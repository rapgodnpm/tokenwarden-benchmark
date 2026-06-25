Fixed the CLI argument parser. The original implementation only handled boolean flags, but the test required support for:
- `--key` (boolean flag)
- `--key value` (separate value)
- `--key=value` (inline value)
- Positional arguments

**Changes made to `bench-targets/cli-flags/src/parseArgs.mjs`:**
1. Added support for `--key` flags without values (boolean, true)
2. Added support for `--key value` (next arg becomes value if not a flag)
3. Added support for `--key=value` (inline value extraction)
4. Preserved positional arguments in `_`
5. Removed dependency on `long-argument-form` (remains dependency-free)

**Verification:** `node --test bench-targets/cli-flags/parseArgs.test.mjs` passes with 1 test passing.
