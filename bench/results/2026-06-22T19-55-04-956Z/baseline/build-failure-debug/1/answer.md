The issue is clear: `config.mjs` exports a property `entries`, but `build.mjs` expects `entryPoints` (line 3). I'll fix the property name in the config file.







Fixed `bench-targets/build-failure/src/config.mjs`: changed `entries` to `entryPoints` to match the expected property name in `build.mjs`. Verification: `node bench-targets/build-failure/build.mjs` outputs `build ok`.
