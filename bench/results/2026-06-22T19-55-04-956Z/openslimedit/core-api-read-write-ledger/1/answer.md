Now I have all the file contents. Let me create the bench-artifacts directory and the markdown file with the ledger content:










**bench-artifacts/core-api-read-write-ledger.md created.**

**Verification command:**
```bash
head -20 bench-artifacts/core-api-read-write-ledger.md
```

**Files read:** 16 files from the specified list (src/index.ts, src/types.ts, src/hono.ts, src/hono-base.ts, src/context.ts, src/request.ts, src/request/constants.ts, src/utils/body.ts, src/compose.ts, src/http-exception.ts, src/client/index.ts, src/client/client.ts, src/client/types.ts, src/client/utils.ts, src/client/fetch-result-please.ts, src/adapter/service-worker/index.ts, src/adapter/service-worker/handler.ts, src/adapter/service-worker/types.ts - actually 18 files total, including the 3 service-worker files).

**File structure:**
- File headings: `## <file path>` for each listed file
- Five bullets per file: Public surface, Internal names noticed, Imports or neighbors, Plain-English summary, Copy-safe detail
- Final section: `## Path Inventory` with all file paths as bullets

No source code changes were made.
