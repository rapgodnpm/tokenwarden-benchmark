I'll examine the build configuration files and fix the failure.





The issue is a property name mismatch. `config.mjs` exports `entries` but `build.mjs` expects `entryPoints`. Let me run the build to confirm and fix it.




Confirmed. I'll fix the property name in `config.mjs` to match what `build.mjs` expects.







Fixed by changing `entries` to `entryPoints` in `bench-targets/build-failure/src/config.mjs`. Verification: `node bench-targets/build-failure/build.mjs` passes with output `build ok`.
