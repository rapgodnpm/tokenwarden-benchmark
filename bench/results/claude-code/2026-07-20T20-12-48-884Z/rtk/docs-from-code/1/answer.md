

Done.

**Summary:**
- **Source file:** `bench-targets/docs/src/cache.mjs` (12 lines, simple in-memory cache with `get`, `set`, `delete`, `clear` methods)
- **Output file:** `bench-artifacts/cache-api.md`
- **Commands run:**
  - `Read bench-targets/docs/src/cache.mjs` — read source implementation
  - `mkdir -p bench-artifacts` — created output directory
  - `Write bench-artifacts/cache-api.md` — wrote user-facing documentation

**Verification Status:** ✅ Documentation written with all required sections:
- `# Cache API`
- `## createCache()`
- `## Methods`
- Mentions `get`, `set`, `delete`, and `clear`
