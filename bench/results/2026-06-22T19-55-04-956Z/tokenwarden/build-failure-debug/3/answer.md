I see the issue: `config.mjs` exports `entries` but `build.mjs` checks for `entryPoints`. Let me verify the build failure first:




Confirmed. The build fails because `config.mjs` exports `entries` but `build.mjs` validates `entryPoints`. Fix by adding `entryPoints` to the config:







Fixed the build failure by changing `entries` to `entryPoints` in `bench-targets/build-failure/src/config.mjs`. Build now succeeds (`node bench-targets/build-failure/build.mjs` outputs "build ok").
