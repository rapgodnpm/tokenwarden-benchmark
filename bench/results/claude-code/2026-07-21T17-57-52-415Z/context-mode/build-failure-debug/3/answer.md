

Build fixed successfully.

**Issue:** `config.mjs` exported `entries` but `build.mjs` expected `entryPoints`.

**Fix:** Renamed `entries` to `entryPoints` in `bench-targets/build-failure/src/config.mjs`.

**Verification:** `node bench-targets/build-failure/build.mjs` → `build ok`
