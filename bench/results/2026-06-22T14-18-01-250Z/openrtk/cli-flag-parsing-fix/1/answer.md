The current parser only handles boolean flags but ignores `--key value` and `--key=value` syntaxes. I'll fix it to handle all cases:







The test is failing because the logic doesn't handle all cases correctly. The issue is:
- For `--count 3`: The parser incorrectly marks `count: true` and treats `3` as positional
- For `--output=dist`: The parser uses `output=dist` as the key (instead of `output: 'dist'`)

I need to fix the logic to:
1. For `--key=value` (arg contains =): extract key=value properly
2. For `--key` where next is a value (next doesn't start with -): treat as flag-value 
3. For `--key` where next is a flag or no next: treat as boolean







The issue is `--output=dist` is being parsed as `'--output': 'dist'` instead of `'output': 'dist'`. I need to handle the `'--'` prefix properly in the equals syntax, or split the key correctly:







Still failing. Let me check what's actually in the file now:




I see the issue - when we have `--output=dist`, the key is extracted as `--output` instead of `output`. I need to remove the `--` prefix from the key:







Test passes. Here's the final verification:




**Fix completed.** The CLI argument parser now supports all required formats:

- **Boolean flags**: `--verbose` → `{verbose: true}`
- **--key value pairs**: `--count 3` → `{count: '3'}`
- **--key=value syntax**: `--output=dist` → `{output: 'dist'}`
- **Positional arguments**: `src/index.js` → `_: ['src/index.js']`

**Verification status:** ✅ All tests passed (1/1)
