

Done.

**Files:**
- Source: `bench-targets/docs/src/cache.mjs`
- Output: `bench-artifacts/cache-api.md`

**Commands:**
- `cat bench-targets/docs/src/cache.mjs` - read source
- `mkdir -p bench-artifacts` - create output directory
- `write bench-artifacts/cache-api.md` - write docs

**Verification:** File created at `bench-artifacts/cache-api.md` with:
- `# Cache API` heading
- `## createCache()` section
- `## Methods` section
- All four methods documented: `get`, `set`, `delete`, `clear`
