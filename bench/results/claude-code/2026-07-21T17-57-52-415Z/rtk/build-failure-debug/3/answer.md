

**Fix Summary:**

| Item | Value |
|------|-------|
| **File edited** | `bench-targets/build-failure/src/config.mjs` |
| **Change** | Renamed `entries` → `entryPoints` to match the expected config schema |
| **Preserved** | Entry path `['src/index.js']` and output directory `'dist'` semantics |
| **Verification** | `node bench-targets/build-failure/build.mjs` → `build ok` |
