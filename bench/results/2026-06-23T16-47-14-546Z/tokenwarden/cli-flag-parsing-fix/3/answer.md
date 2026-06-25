The current parser has issues:
1. Doesn't handle `--key=value` syntax
2. Doesn't handle `--key value` (separate value)
3. Treats all `--flag`s as booleans

I need to fix it to handle all three cases correctly.







The key extraction is missing the `--` prefix removal. Let me fix that:







**Fixed `bench-targets/cli-flags/src/parseArgs.mjs`**

Changes made:
1. Added support for `--key=value` syntax by detecting `=` in the argument
2. Added support for `--key value` (separate argument) by checking next arg doesn't start with `-`
3. Properly extract keys by removing `--` prefix for both syntaxes

**Verification**
```
node --test bench-targets/cli-flags/parseArgs.test.mjs
```
**Status:** ✅ Pass (1/1 tests passed)
