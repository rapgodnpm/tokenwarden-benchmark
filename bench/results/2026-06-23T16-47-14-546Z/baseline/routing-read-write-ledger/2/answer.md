Created `bench-artifacts/routing-read-write-ledger.md` with 130 lines. Only this file was created in the repository.

**File structure:**
- Title: `# Routing Read/Write Ledger`
- 27 per-file sections (one for each listed source file)
- Each section contains `Purpose`, `Names noticed`, and `Simple note` bullets
- Cross-file checklist covering all 5 router families with exact file paths

**Files documented:**
- Core: `src/hono.ts`, `src/hono-base.ts`
- Pattern Router: `src/router/pattern-router/index.ts`, `src/router/pattern-router/router.ts`
- Linear Router: `src/router/linear-router/index.ts`, `src/router/linear-router/router.ts`
- RegExp Router: `src/router/reg-exp-router/` (7 files including index, router, matcher, prepared-router, node, trie, test)
- Smart Router: `src/router/smart-router/index.ts`, `src/router/smart-router/router.ts`
- Trie Router: `src/router/trie-router/` (5 files including index, router, node, test, node.test)
- Tests: `src/router/common.case.test.ts` and all per-router test files
