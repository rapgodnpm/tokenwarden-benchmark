I'll create the bench-artifacts directory, read all the specified files, and generate the benchmark ledger document.








































I see I have all the router files read. However, I notice the results include files from trie-router in one batch and smart-router/common.case.test.ts in another. Let me consolidate and create the final document.

Based on the reads, here's what I gathered:

- **src/hono.ts** - Main Hono entry point, extends HonoBase, uses SmartRouter with [RegExpRouter, TrieRouter](src/hono.ts:31), has `router` property
- **src/hono-base.ts** - Base Hono class with router, context, request handling, has `router` property, `#routes` array
- **src/router/pattern-router/index.ts** - Export file (29 lines total)
- **src/router/pattern-router/router.ts** - PatternRouter class with `add`/`match` methods, builds regex from path pattern
- **src/router/linear-router/index.ts** - Export file (15 lines total)
- **src/router/linear-router/router.ts** - LinearRouter class with linear path matching, `add`/`match` methods, handles `*`, `:label`, `{pattern}`
- **src/router/reg-exp-router/index.ts** - Export file (12 lines total)
- **src/router/reg-exp-router/matcher.ts** - Matcher class with `match` function, uses `buildAllMatchers`
- **src/router/reg-exp-router/node.ts** - Node class with `insert`/`buildRegExpStr`, trie tree implementation
- **src/router/reg-exp-router/trie.ts** - Trie class with `insert`/`buildRegExp`, creates trie regex
- **src/router/smart-router/index.ts** - Export file (11 lines total)
- **src/router/smart-router/router.ts** - SmartRouter class, wrapper around multiple routers
- **src/router/trie-router/index.ts** - Export file (12 lines total)
- **src/router/trie-router/router.ts** - TrieRouter class with `add`/`match`, uses Node
- **src/router/trie-router/node.ts** - Node class with `insert`/`search`, tree-based routing, matches by path parts
- **src/router/pattern-router/router.test.ts** - Tests for PatternRouter, skips UnsupportedPathError and trailing slash
- **src/router/linear-router/router.test.ts** - Tests for LinearRouter with skip
- **src/router/reg-exp-router/router.test.ts** - Tests for RegExpRouter with skip
- **src/router/smart-router/router.test.ts** - Tests for SmartRouter using RegExpRouter + TrieRouter
- **src/router/trie-router/router.test.ts** - Tests for TrieRouter
- **src/router/trie-router/node.test.ts** - Tests for Node class







Created `/private/tmp/tokenwarden-bench/2026-06-19T22-15-13-025Z/openslimedit-routing-read-write-ledger-1/repo/bench-artifacts/routing-read-write-ledger.md` with:

- 20 file sections in order: src/hono.ts, src/hono-base.ts, and all router impls + tests
- Each section with Purpose, Names noticed, Simple note bullets
- Cross-File Checklist with all 5 router families
- Exact file paths included throughout
- Only this file was created
