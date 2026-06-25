The current parser only handles boolean flags. I'll rewrite it to support all required syntaxes:







The equals syntax isn't splitting correctly. Fixing the logic:






















Positionals aren't being captured correctly. Fix the logic:










I see a syntax error - the first if block needs to be closed. Let me rewrite the entire function cleanly:







The logic still isn't right. I need to handle `--key value` and `--key=value` correctly, tracking which flags have consumed an argument:







The `--output=dist` flag creates both `output=dist: true` and `output: 'dist'`. Fix by not setting boolean flag when equals syntax is used:







Positionals still not being captured. Need to handle them separately:







```bash
node --test bench-targets/cli-flags/parseArgs.test.mjs
```

**Result:** ✓ Test passed (1 passed, 0 failed)

**Fix summary:** Rewrote `parseArgs.mjs` to correctly handle:
- Boolean flags: `--verbose` → `verbose: true`
- `--key=value` syntax: `--output=dist` → `output: 'dist'`
- `--key value` syntax: `--count 3` → `count: '3'`
- Positional arguments (anything after flags): `src/index.js` → `_: ['src/index.js']`

The parser is now dependency-free and implements all required CLI argument parsing behaviors.
