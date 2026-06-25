The current parser sets all flags to `true` without handling values. I need to fix it to support:
- Boolean flags (`--verbose`)
- `--key value` syntax
- `--key=value` syntax  
- Positional arguments







The key parsing for `--output=dist` is wrong - the key includes the `=`. Need to split properly first.







**Fixed `bench-targets/cli-flags/src/parseArgs.mjs`**

Changes made:
1. Positonals (no `--`) → push to `result._`
2. `--key=value` → split by `=`, store key portion (minus `--`) and value
3. `--key value` → consume next non-flag arg as value
4. `--key` alone → store as `true`

**Commands run:**
```
node --test bench-targets/cli-flags/parseArgs.test.mjs
```

**Verification status:** ✅ PASS (1 test, 0 failures)
