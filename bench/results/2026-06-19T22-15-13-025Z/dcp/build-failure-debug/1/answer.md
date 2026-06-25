The mismatch is clear: `config.mjs` defines `entries` (line 2), but `build.mjs` checks for `entryPoints` (line 3). I'll fix the config to use the correct property name.





Fixed `entries` → `entryPoints` in `config.mjs` at path `bench-targets/build-failure/src/config.mjs`. Verification: `node bench-targets/build-failure/build.mjs` outputs `build ok`.
