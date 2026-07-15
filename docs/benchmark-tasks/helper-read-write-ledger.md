# Helper read/write ledger

**In short:** The model reads Hono's helper modules and writes a structured inventory without changing source code.

## What happens

The task uses the pinned Hono repository. The model must read all 23 files below, then create `bench-artifacts/helper-read-write-ledger.md`.

For each file, the document must list important exports or names, explain what the file does, identify neighboring files, and give a safe summary. It must finish with a checklist of every path.

```text
src/helper/factory/index.ts
src/helper/route/index.ts
src/helper/websocket/index.ts
src/helper/cookie/index.ts
src/helper/testing/index.ts
src/helper/adapter/index.ts
src/helper/css/index.ts
src/helper/css/common.ts
src/helper/proxy/index.ts
src/helper/dev/index.ts
src/helper/html/index.ts
src/helper/ssg/index.ts
src/helper/ssg/ssg.ts
src/helper/ssg/utils.ts
src/helper/ssg/middleware.ts
src/helper/streaming/index.ts
src/helper/streaming/stream.ts
src/helper/streaming/sse.ts
src/helper/streaming/text.ts
src/helper/accepts/index.ts
src/helper/accepts/accepts.ts
src/helper/conninfo/index.ts
src/helper/conninfo/types.ts
```

## What it measures

Efficiently reading many small, related modules and turning them into consistent documentation. This is an endurance task, not a code-change task.

## How it passes

The automated check passes when the ledger exists, has the required title, and contains sections for `src/helper/factory/index.ts` and `src/helper/streaming/sse.ts`.

The prompt also requires sections for all 23 files, a complete path checklist, and no Hono source edits. The automated check does not verify those additional requirements.

[See the exact task definition](../../bench/tasks/future.v1.json).
