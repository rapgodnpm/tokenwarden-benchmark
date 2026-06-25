I'll create the benchmark ledger for the helper-read-write-ledger task. Let me start by creating the directory and reading all the specified files.





Now let me read all the specified files in parallel batches:




Now let me read all 23 specified files:




























Now I have all the file contents. Let me create the benchmark ledger file:



















The file has been created successfully.

**Created file:** `bench-artifacts/helper-read-write-ledger.md`

**Verification status:** ✓ Complete

**File contains:**
- `# Helper Read/Write Ledger` header at the top
- 23 file sections, each with ## heading and 4 bullet points (Main exports or names, Reads as, Neighbor files, Safe summary)
- Final `## Simple Index` section with all 23 file paths as checkboxes

**Files covered:**
- factory: 1 file (index.ts)
- route: 1 file (index.ts)
- websocket: 1 file (index.ts)
- cookie: 1 file (index.ts)
- testing: 1 file (index.ts)
- adapter: 1 file (index.ts)
- css: 2 files (index.ts, common.ts)
- proxy: 1 file (index.ts)
- dev: 1 file (index.ts)
- html: 1 file (index.ts)
- ssg: 5 files (index.ts, ssg.ts, utils.ts, middleware.ts, plugins.ts)
- streaming: 5 files (index.ts, stream.ts, sse.ts, text.ts, utils.ts)
- accepts: 2 files (index.ts, accepts.ts)
- conninfo: 2 files (index.ts, types.ts)

**Total:** 23 files as specified in the requirements
