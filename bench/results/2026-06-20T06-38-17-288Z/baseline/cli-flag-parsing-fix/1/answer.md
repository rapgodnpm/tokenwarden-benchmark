I'll read both the parser and test files to understand the current implementation and what needs to be fixed.





Looking at the current implementation, I can see several issues:
1. It treats all `--flag` as booleans
2. It doesn't support `--key=value` syntax
3. It doesn't handle `--flag value` (space-separated)
4. It doesn't properly separate positional arguments

Let me run the current test to see what fails:




Now I understand the failures. I need to rewrite the parser to handle `--key=value` syntax, capture values for flags without equals sign, and properly handle positionals. I'll rewrite it in a single, compact implementation:




Now let me verify the test passes:




The issue is that for `--output=dist`, the key is being extracted with the `=` sign included (`--output` instead of `output`). I need to fix the key extraction:







**Verification status: ✅ Pass**

Test passed with the fix. The parser now correctly handles:
- Boolean flags: `--verbose`
- Value flags with space: `--count 3` 
- Key-value with equals: `--output=dist`
- Positional arguments: `src/index.js`

**Changes made:**
- Fixed key extraction for `--key=value` syntax to slice from position 2 onwards (removing the `--` prefix)
- Added logic to handle space-separated values by checking the next argument
- No external dependencies, implementation remains small (20 lines)
