The issue is clear: `config.mjs` exports `entries` but `build.mjs` checks for `entryPoints`. I'll fix the property name in `config.mjs` to match:







Fixed `bench-targets/build-failure/src/config.mjs`: changed `entries` to `entryPoints` to match the validation in `build.mjs`. Verification: `build ok` ✓
