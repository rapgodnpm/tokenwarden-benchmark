Benchmark task: next-api-route-fix
Repository: https://github.com/honojs/hono.git

Fix validation and error handling in bench-targets/next-api/app/api/users/route.mjs. Read the route and bench-targets/next-api/route.test.mjs before editing. Malformed JSON and missing required fields should return HTTP 400, while valid payloads should return HTTP 201. Keep the API route shape intact. Run node --test bench-targets/next-api/route.test.mjs when done.

Constraints:
- Do not ask the user to write prompts or inspect files manually.
- Prefer the smallest safe code change when edits are required.
- Include exact file paths, commands run, and verification status in the final answer.
