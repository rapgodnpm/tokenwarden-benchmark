Benchmark task: cli-flag-parsing-fix
Repository: https://github.com/honojs/hono.git

Fix the CLI argument parser in bench-targets/cli-flags/src/parseArgs.mjs. Read the parser and bench-targets/cli-flags/parseArgs.test.mjs first. The parser must support boolean flags, --key value pairs, --key=value syntax, and positional arguments. Keep the implementation small and dependency-free. Verify with node --test bench-targets/cli-flags/parseArgs.test.mjs.

Constraints:
- Do not ask the user to write prompts or inspect files manually.
- Prefer the smallest safe code change when edits are required.
- Include exact file paths, commands run, and verification status in the final answer.
