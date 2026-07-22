Benchmark task: core-api-read-write-ledger
Repository: https://github.com/honojs/hono.git

Create a new file at bench-artifacts/core-api-read-write-ledger.md. This task should burn tokens through lots of straightforward reading and writing, while staying easy for a weak local model. Do not make any source-code changes. First create the bench-artifacts directory if it is missing. Then read every file in this exact list before writing: src/index.ts, src/types.ts, src/hono.ts, src/hono-base.ts, src/context.ts, src/request.ts, src/request/constants.ts, src/utils/body.ts, src/compose.ts, src/http-exception.ts, src/client/index.ts, src/client/client.ts, src/client/types.ts, src/client/utils.ts, src/client/fetch-result-please.ts, src/adapter/service-worker/index.ts, src/adapter/service-worker/handler.ts, src/adapter/service-worker/types.ts. The output file must start with '# Core API Read/Write Ledger'. For each listed file, add a heading exactly '## <file path>'. Under each heading write five short bullets: '- Public surface: ...', '- Internal names noticed: ...', '- Imports or neighbors: ...', '- Plain-English summary: ...', and '- Copy-safe detail: ...'. Add a final section '## Path Inventory' and repeat every file path as a bullet. Keep everything factual and boring. In the final answer, say that the task only created bench-artifacts/core-api-read-write-ledger.md and list any verification command you ran.

Constraints:
- Do not ask the user to write prompts or inspect files manually.
- Prefer the smallest safe code change when edits are required.
- Include exact file paths, commands run, and verification status in the final answer.
