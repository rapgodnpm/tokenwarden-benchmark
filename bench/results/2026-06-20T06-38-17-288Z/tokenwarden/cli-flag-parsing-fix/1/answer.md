The current parser only handles boolean flags (`--key`). The test requires support for boolean flags, `--key value` pairs, `--key=value` syntax, and positional arguments.

I'll rewrite the parser to handle all these cases:







The parser incorrectly keeps the `--` prefix for `--key=value` syntax. The test expects `output`, not `--output`:







Fixed `/private/tmp/tokenwarden-bench/2026-06-20T06-38-17-288Z/tokenwarden-cli-flag-parsing-fix-1/repo/bench-targets/cli-flags/src/parseArgs.mjs` by adding support for `--key=value` syntax and `--key value` pairs. Verification: passed.
