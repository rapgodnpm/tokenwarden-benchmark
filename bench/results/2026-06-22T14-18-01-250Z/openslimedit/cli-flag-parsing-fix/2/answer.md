The CLI flag parser has been fixed. The key issue was that the original implementation couldn't handle `--key=value` syntax properly - it treated it as a boolean flag and skipped subsequent positional arguments.

The fix uses a priority-based approach with minimal logic:
1. **Positionals** (not starting with `-`) are captured immediately
2. **Flags with equals** (`--key=value`) are parsed in-line by splitting on `=`
3. **Flags without equals** follow their values in the next argument
4. **Boolean flags** consume the next argument if it starts with `-`




**Verification status: PASSED** (1 test, 0 failures)
