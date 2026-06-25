The issue is clear: `config.mjs` exports `entries` but `build.mjs` expects `entryPoints`. The fix is to rename the property.







Fixed the property name mismatch. Changed `entries` to `entryPoints` in `bench-targets/build-failure/src/config.mjs` to match what `build.mjs` expects. Verification: `node bench-targets/build-failure/build.mjs` outputs `build ok`.
