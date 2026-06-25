Benchmark task: multi-file-rename-migration
Repository: https://github.com/honojs/hono.git

Migrate bench-targets/rename from oldFormatUser to formatUserLabel across implementation, exports, and references. Read all files under bench-targets/rename before editing. Keep behavior identical and remove stale oldFormatUser references from source files. Verify with node --test bench-targets/rename/format-user.test.mjs and confirm grep -R oldFormatUser bench-targets/rename/src finds no matches.

Constraints:
- Do not ask the user to write prompts or inspect files manually.
- Prefer the smallest safe code change when edits are required.
- Include exact file paths, commands run, and verification status in the final answer.
