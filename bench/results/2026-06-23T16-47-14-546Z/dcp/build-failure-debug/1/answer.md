The build fails because `config.mjs` uses `entries` but `build.mjs` expects `entryPoints`. I need to rename the property in the config file.







Fixed the configuration mismatch. Renamed `entries` to `entryPoints` in `src/config.mjs`.

- File: `bench-targets/build-failure/src/config.mjs:1-4`
- Command: `node bench-targets/build-failure/build.mjs`
- Verification: ✅ `build ok`
