The issue is clear: `config.mjs` exports properties named `entries` and `outDir`, but `build.mjs` expects property names `entryPoints` and `outDir`.

I'll fix `config.mjs` to use the correct property name `entryPoints`:







Fixed the build configuration failure.

**Issue:** `config.mjs` exported `entries` but `build.mjs` expected `entryPoints`

**Fix:** Changed property name from `entries` to `entryPoints` in `bench-targets/build-failure/src/config.mjs`

**Verification:** `node bench-targets/build-failure/build.mjs` → `build ok`
