The issue is clear: `config.mjs` exports `entries` but `build.mjs` expects `entryPoints`. I'll fix this by renaming the property.







Fixed and verified:

- **File edited**: `bench-targets/build-failure/src/config.mjs`
- **Change**: Renamed `entries` → `entryPoints` to match what `build.mjs` expects
- **Verification**: `node bench-targets/build-failure/build.mjs` outputs `build ok`
