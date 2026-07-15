# Routing read/write ledger

**In short:** The model reads a broad slice of Hono's routing code and writes a long, structured inventory without changing source code.

## What happens

The task uses the pinned Hono repository. The model must read all 24 files below, then create `bench-artifacts/routing-read-write-ledger.md`.

For each file, the document must include its purpose, names found in it, and a simple note. It must finish with a checklist covering the pattern, linear, regular-expression, smart, and trie router families.

```text
src/hono.ts
src/hono-base.ts
src/router/pattern-router/index.ts
src/router/pattern-router/router.ts
src/router/linear-router/index.ts
src/router/linear-router/router.ts
src/router/reg-exp-router/index.ts
src/router/reg-exp-router/router.ts
src/router/reg-exp-router/matcher.ts
src/router/reg-exp-router/prepared-router.ts
src/router/reg-exp-router/node.ts
src/router/reg-exp-router/trie.ts
src/router/smart-router/index.ts
src/router/smart-router/router.ts
src/router/trie-router/index.ts
src/router/trie-router/router.ts
src/router/trie-router/node.ts
src/router/common.case.test.ts
src/router/pattern-router/router.test.ts
src/router/linear-router/router.test.ts
src/router/reg-exp-router/router.test.ts
src/router/smart-router/router.test.ts
src/router/trie-router/router.test.ts
src/router/trie-router/node.test.ts
```

## What it measures

Efficiently reading many related files, keeping their details straight, and producing a large but mechanically simple output. This is an endurance task, not a debugging task.

## How it passes

The automated check passes when the ledger exists, has the required title, and contains sections for `src/router/trie-router/node.ts` and `src/router/reg-exp-router/matcher.ts`.

The prompt also requires sections for all 24 files, the router-family checklist, and no Hono source edits. The automated check does not verify those additional requirements.

[See the exact task definition](../../bench/tasks/future.v1.json).
