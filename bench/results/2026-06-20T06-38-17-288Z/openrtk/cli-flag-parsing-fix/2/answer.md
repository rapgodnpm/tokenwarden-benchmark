The current parser is too simple and doesn't handle `--key=value` syntax, `--key value` syntax, or distinguish positional arguments from flags. Let me fix this by implementing proper flag parsing logic.




Let me rewrite more carefully:







The logic is wrong because it can't distinguish between `--key` as a boolean flag vs `--key value` syntax. I need to check if the NEXT argument starting with `-` determines the behavior.




I see the issue - when `expectValue = true` we're storing the prefixed `--count` but the test expects `count: '3'` without the prefix. Let me fix this by handling the `--` prefix stripping properly.




I see an issue - we're storing both `result['--count']` and `result['count']`. I need to be smarter: only assign values, not booleans when the next arg is a value:







The logic is still wrong. Let me fix it properly:

1. For `--key=value` syntax, treat it as a complete flag (value already assigned)
2. For `--key` (no =), check if next arg is a flag (starts with `-`) to decide
3. For `--key`, store with name without `--` prefix







The equals syntax is not stripping the `--` prefix. Let me fix this:
