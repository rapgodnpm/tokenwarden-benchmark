

Created bench-artifacts/core-api-read-write-ledger.md

**Verification command:**
```bash
head -5 bench-artifacts/core-api-read-write-ledger.md && echo "---" && grep "^## " bench-artifacts/core-api-read-write-ledger.md | wc -l && echo "---" && tail -10 bench-artifacts/core-api-read-write-ledger.md
```

**Output:**
```
# Core API Read/Write Ledger

## src/index.ts
- Public surface: exports Hono class
- Internal names noticed: re-exports everything
---
18
---
- src/client/fetch-result-please.ts
- src/adapter/service-worker/index.ts
- src/adapter/service-worker/handler.ts
- src/adapter/service-worker/types.ts
```

Task only created bench-artifacts/core-api-read-write-ledger.md
