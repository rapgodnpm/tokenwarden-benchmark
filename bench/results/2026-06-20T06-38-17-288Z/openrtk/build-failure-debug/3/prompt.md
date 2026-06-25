Benchmark task: build-failure-debug
Repository: https://github.com/honojs/hono.git

Fix the seeded build configuration failure in bench-targets/build-failure. Read bench-targets/build-failure/src/config.mjs and bench-targets/build-failure/build.mjs. Preserve the existing entry path and output directory semantics. Verify with node bench-targets/build-failure/build.mjs.

Constraints:
- Do not ask the user to write prompts or inspect files manually.
- Prefer the smallest safe code change when edits are required.
- Include exact file paths, commands run, and verification status in the final answer.
