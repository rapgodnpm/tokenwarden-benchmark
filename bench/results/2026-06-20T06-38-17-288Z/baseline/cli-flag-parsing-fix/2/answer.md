I'll read both the parser implementation and test file to understand the issue.





I see the issue. The current parser only handles boolean flags, but the test expects support for:
1. Boolean flags: `--verbose` → `verbose: true`
2. Flags with space: `--count 3` → `count: '3'`
3. Equals syntax: `--output=dist` → `output: 'dist'`
4. Positional args in `_` array

Let me run the test to confirm it fails, then fix the parser:




Now I'll fix the parser to handle all the required cases:







Let me trace through the issue. The equals syntax parsing is consuming flag keys that should be treated as flags. Let me fix this properly:




That's buggy - `lastKey` is not defined. Let me fix this:




That's completely broken. Let me rewrite properly:







The equals parsing is wrong - it's not stripping the `--` prefix. Let me fix that:
