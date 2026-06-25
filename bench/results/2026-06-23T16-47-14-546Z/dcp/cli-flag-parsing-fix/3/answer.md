The current parser has several issues:
1. Doesn't support `--key value` pairs (takes next arg as value)
2. Doesn't support `--key=value` syntax
3. Treats all `--` args as booleans (missing key='value' logic)

Let me run the test first to confirm it fails:




Now I'll fix the parser with a minimal implementation:




Wait, there's a bug - I used the wrong variable name. Let me fix:













The issue is `arg.includes('=')` is detecting `--output=dist` but also creating `output=dist` as a key. I need to check if the arg starts with `--` and has `=` after the `--`:







The `output=dist` key still appears, which means the else-if at line 12 is also matching. Let me trace the logic - the equals check comes first, so it should handle `--output=dist`. But then the final `result[arg.slice(2)] = true` at line 17 also creates the key. I need to restructure:







Test passes.

**Summary:**
- **Fixed file:** `bench-targets/cli-flags/src/parseArgs.mjs`
- **Changes made:** Supported `--key value` pairs, `--key=value` syntax, boolean flags, and positional arguments
- **Command run:** `node --test bench-targets/cli-flags/parseArgs.test.mjs`
- **Verification status:** ✅ PASS (1 test passed)
