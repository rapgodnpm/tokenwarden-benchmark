The issue is clear: `config.mjs` exports `entries` but `build.mjs` expects `entryPoints`. I'll fix this mismatch:







Fixed the build configuration failure:

- **File path:** `bench-targets/build-failure/src/config.mjs`
- **Change:** Changed `entries` to `entryPoints` in the exported config object (line 2)
- **Command:** `node bench-targets/build-failure/build.mjs`
- **Verification:** `build ok`
