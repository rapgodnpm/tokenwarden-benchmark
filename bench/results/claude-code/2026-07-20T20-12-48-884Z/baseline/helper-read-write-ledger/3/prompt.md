Benchmark task: helper-read-write-ledger
Repository: https://github.com/honojs/hono.git

Create a new file at bench-artifacts/helper-read-write-ledger.md. This is a long, simple read and write task for a small local model. Do not refactor or fix anything. First create the bench-artifacts directory if needed. Then read every file in this exact list before writing: src/helper/factory/index.ts, src/helper/route/index.ts, src/helper/websocket/index.ts, src/helper/cookie/index.ts, src/helper/testing/index.ts, src/helper/adapter/index.ts, src/helper/css/index.ts, src/helper/css/common.ts, src/helper/proxy/index.ts, src/helper/dev/index.ts, src/helper/html/index.ts, src/helper/ssg/index.ts, src/helper/ssg/ssg.ts, src/helper/ssg/utils.ts, src/helper/ssg/middleware.ts, src/helper/streaming/index.ts, src/helper/streaming/stream.ts, src/helper/streaming/sse.ts, src/helper/streaming/text.ts, src/helper/accepts/index.ts, src/helper/accepts/accepts.ts, src/helper/conninfo/index.ts, src/helper/conninfo/types.ts. The output file must start with '# Helper Read/Write Ledger'. For each listed file, add a heading exactly '## <file path>'. Under each heading write four short bullets: '- Main exports or names: ...', '- Reads as: ...', '- Neighbor files: ...', and '- Safe summary: ...'. Use simple wording and cite paths literally. Add a final section '## Simple Index' that repeats all file paths as a checklist. Do not edit source files. In the final answer, include the created file path and verification status.

Constraints:
- Do not ask the user to write prompts or inspect files manually.
- Prefer the smallest safe code change when edits are required.
- Include exact file paths, commands run, and verification status in the final answer.
