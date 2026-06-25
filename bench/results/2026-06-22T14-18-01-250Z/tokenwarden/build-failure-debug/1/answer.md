The issue is clear: `config.mjs` exports `entries` but `build.mjs` checks for `entryPoints`. I need to align these.







Fixed by changing `entries` to `entryPoints` in `bench-targets/build-failure/src/config.mjs`. The build now outputs `build ok`.
