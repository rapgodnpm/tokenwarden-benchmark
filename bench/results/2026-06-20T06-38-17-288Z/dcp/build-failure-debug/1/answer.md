The issue is clear: `config.mjs` exports `entries` but `build.mjs` checks for `entryPoints`. I'll add an alias to fix this:







Fixed by adding `entryPoints` alias to `config.mjs`. Verification: `node bench-targets/build-failure/build.mjs` outputs "build ok" (passed).
