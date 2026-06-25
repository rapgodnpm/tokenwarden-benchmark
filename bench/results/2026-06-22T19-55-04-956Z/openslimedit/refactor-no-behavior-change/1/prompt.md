Benchmark task: refactor-no-behavior-change
Repository: https://github.com/honojs/hono.git

Refactor bench-targets/refactor/src/name-formatters.mjs to remove duplicated whitespace normalization logic without changing behavior. Read the source and bench-targets/refactor/name-formatters.test.mjs first. Introduce one small shared helper named normalizeName and keep existing public exports. Verify with node --test bench-targets/refactor/name-formatters.test.mjs.

Constraints:
- Do not ask the user to write prompts or inspect files manually.
- Prefer the smallest safe code change when edits are required.
- Include exact file paths, commands run, and verification status in the final answer.
