

**Fix complete.**

| File | Change |
|------|--------|
| `bench-targets/build-failure/src/config.mjs` | Changed `entries` → `entryPoints` |

**Verification:** `node bench-targets/build-failure/build.mjs` outputs `build ok` (exit code 0).

The entry path (`src/index.js`) and output directory (`dist`) semantics are preserved.
