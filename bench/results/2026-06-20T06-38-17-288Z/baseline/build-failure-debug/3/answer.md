The issue is clear: `config.mjs` exports `entries` but `build.mjs` checks for `entryPoints` in `config.entryPoints`. I'll fix the config file to use `entryPoints`:







Fixed `bench-targets/build-failure/src/config.mjs`: changed `entries` to `entryPoints` to match the expected configuration key in `build.mjs`.

Verification: `node bench-targets/build-failure/build.mjs` outputs `build ok` ✓
