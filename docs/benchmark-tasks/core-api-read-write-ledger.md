# Core API read/write ledger

**In short:** The model reads Hono's main API, request, client, and service-worker files and writes a structured inventory without changing source code.

## What happens

The task uses the pinned Hono repository. The model must read all 18 files below, then create `bench-artifacts/core-api-read-write-ledger.md`.

For each file, the document must cover its public surface, internal names, related imports or files, a plain-English summary, and one copy-safe detail. It must finish with a complete path inventory.

```text
src/index.ts
src/types.ts
src/hono.ts
src/hono-base.ts
src/context.ts
src/request.ts
src/request/constants.ts
src/utils/body.ts
src/compose.ts
src/http-exception.ts
src/client/index.ts
src/client/client.ts
src/client/types.ts
src/client/utils.ts
src/client/fetch-result-please.ts
src/adapter/service-worker/index.ts
src/adapter/service-worker/handler.ts
src/adapter/service-worker/types.ts
```

## What it measures

Efficiently reading a wider core API surface and producing factual, consistent documentation. This is an endurance task, not a code-change task.

## How it passes

The automated check passes when the ledger exists, has the required title, and contains sections for `src/hono-base.ts` and `src/client/client.ts`.

The prompt also requires sections for all 18 files, a complete path inventory, and no Hono source edits. The automated check does not verify those additional requirements.

[See the exact task definition](../../bench/tasks/future.v1.json).
