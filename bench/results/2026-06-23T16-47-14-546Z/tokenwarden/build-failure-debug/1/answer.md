**Fix Summary:**

- **File changed:** `bench-targets/build-failure/src/config.mjs`
- **Change:** Renamed `entries` to `entryPoints` (line 2)
- **Reason:** `build.mjs` expects `config.entryPoints` but config was exporting `entries`
- **Verification:** `node bench-targets/build-failure/build.mjs` returns "build ok"

Entry path (`src/index.js`) and output directory (`dist`) semantics preserved.
