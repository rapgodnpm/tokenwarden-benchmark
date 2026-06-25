The issue is clear: `config.mjs` exports `entries` but `build.mjs` expects `entryPoints`.







**Fix applied**: `bench-targets/build-failure/src/config.mjs:1-4` - changed `entries` to `entryPoints` to match the expected config interface.

**Verification**: `node bench-targets/build-failure/build.mjs` → `build ok` ✓
