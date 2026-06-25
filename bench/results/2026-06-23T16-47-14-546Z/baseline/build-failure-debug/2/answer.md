The issue is clear: `config.mjs` exports `entries` but `build.mjs` expects `entryPoints`. Let me fix this:







**Fix applied successfully**

**Issue:** `config.mjs` exported `entries` but `build.mjs` expected `entryPoints`

**Fix:** Changed `entries: ['src/index.js']` → `entryPoints: ['src/index.js']` in `src/config.mjs:2`

**Verification:** `node bench-targets/build-failure/build.mjs` → `build ok`

Entry path and output directory semantics preserved: `'src/index.js'` entry and `'dist'` output directory.
