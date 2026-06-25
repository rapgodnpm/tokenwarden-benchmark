The current parser is broken:
1. It treats all `--` args as booleans, ignoring `--key value` syntax
2. Doesn't handle `--key=value` syntax
3. Positional args go to `_.push()` before checking flags

I'll fix it to handle all cases:







SyntaxError - ternary operator precedence issue. Fixing:







The `--output=dist` case stores key as `--output` instead of `output`. Fixing:







Still stripping dashes incorrectly. Restructuring logic:




That's still broken. Fixing key extraction:







The logic got broken. The separate cases are interfering. Rewriting cleanly:







Test passes. Verifying final implementation:




**Fix complete.** The parser was rewritten to support:
- Boolean flags: `--verbose` → `{ verbose: true }`
- Space syntax: `--count 3` → `{ count: '3' }`
- Equals syntax: `--output=dist` → `{ output: 'dist' }`
- Positional args: added to `result._`
- `---` args: treated as positionals
- `-` args: breaks execution

Test passes (1 pass, 0 fails).
