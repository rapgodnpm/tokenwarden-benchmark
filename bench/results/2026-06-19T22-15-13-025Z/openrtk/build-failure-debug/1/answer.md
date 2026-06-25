The issue is clear: **config.mjs** uses `entries` (line 2) but **build.mjs** expects `entryPoints` (line 3). I'll fix the config to match what the build script expects:







**Fix applied to bench-targets/build-failure/src/config.mjs:** Changed `entries` to `entryPoints`.

**Verification status:** `build ok` ✓
